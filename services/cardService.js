const CardModel = require("../models/cardModel");
const SetModel = require("../models/setModel");

const { getRandomInt, getRandomIndexWeighted } = require("../utils/randomUtils");

const errorHandler = require("../middlewares/errorHandler");

const getRandomRarity = (rarity) => {
  if (!rarity || (!rarity.fixed && !rarity.weighted )) return "any";
  if (rarity.fixed) return rarity.fixed;

  if (rarity.weighted?.weights) {
    const weightsArr = Object.values(rarity.weighted.weights);
    const idx = getRandomIndexWeighted(weightsArr);
    return Object.keys(rarity.weighted?.weights)[idx];
  }
  throw new Error("Missing valid rarity information in source");
};

const getRandomFinish = (finish) => {
  if (!finish || (!finish.fixed && !finish.weighted)) return "any";
  if (finish.fixed) return finish.fixed;

  if (finish.weighted?.weights) {
    const weightsArr = Object.values(finish.weighted.weights);
    const idx = getRandomIndexWeighted(weightsArr);
    return Object.keys(finish.weighted?.weights)[idx];
  }
  throw new Error("Missing valid finish information in source");
};

/**
 * Generates a random card based on the provided query parameters.
 * @param {Object} query - The parameters for filtering cards.
 * @param {string} query.setCode - The set code (required).
 * @param {string[]} query.rarity - List of rarities to include (required).
 * @param {Object} [query.type] - Type filter (optional).
 * @param {string[]} [query.type.include] - Card types to include (optional).
 * @param {string[]} [query.type.exclude] - Card types to exclude (optional).
 * @returns {Object} A random card that matches the query criteria.
*/

const getRandomCards = async ({ 
  releasedAt, 
  setCode, 
  setId, 
  pool, 
  quantity, 
  allowDup = false, 
  note = "",
  slotCode, 
  packType }) => {
  
  const { source_type, child_set_code, gating, rarity, finish, filters } = pool;
  // console.log("filters: " + JSON.stringify(filters));
  if (!setCode || !setId || !source_type || !quantity) throw new Error("Missing required parameters to getRandomCard");
  if (source_type === "child_set" && !child_set_code) throw new Error("Missing child_set_code");

  // if quantity > 1 and mixed rarity/finish, need to generate card 1 by 1
  // so that rarity / finish can be rerolled each time
  let batchGenerate = true;
  if (quantity > 1 && (rarity?.weighted?.weights || finish?.weighted?.weights)) {
    batchGenerate = false;
  }

  let finalSetId = setId;
  if (source_type === "child_set") {
    const set = await SetModel.findOne({ code: child_set_code }).lean();
    if (!set) throw new Error(`Child set not found: ${child_set_code}`);
    finalSetId = set._id;
  }

  // build the MongoDB query to get the biggest pool of cards
  const query = { set_id: finalSetId };
  query.$or = (query.$or || []).concat([
    { "pack_eligibility.pack_types": { $exists: false } },
    { "pack_eligibility.pack_types": packType }, // array contains the packType passed in
  ]);

  const applyArrayFilters = (query, field, filter) => {
    if (!filter) return;

    query[field] = query[field] || {};
    
    if (filter.include_any?.length) query[field].$in = filter.include_any;
    if (filter.include_all?.length) query[field].$all = filter.include_all;
    if (filter.exclude_any?.length) query[field].$nin = filter.exclude_any;

    if (Object.keys(query[field]).length === 0) delete query[field];
  };
  
  if (filters) {
    const formattedFilters = filters.toObject();
    for (const [key, value] of Object.entries(formattedFilters)) {
      // handle filters logic regarding type_line
      if (key === "type_line") {

        const include = value.include?.length ? value.include.map(t => `(${t})`).join("|") : null;
        const exclude = value.exclude?.length ? value.exclude.map(t => `(${t})`).join("|") : null;

        const and = query.$and || [];

        if (include) {
          and.push({ "card_faces.type_line": { $regex: include, $options: "i" } });
        }
        if (exclude) {
          and.push({ "card_faces.type_line": { $not: { $regex: exclude, $options: "i" } } });
        }

        if (and.length) query.$and = and;

      // handle filters logic regarding promo types & frame_effects
      } else if (key === "promo_types") {
        applyArrayFilters(query, "promo_types", value);

      } else if (key === "frame_effects") {
        applyArrayFilters(query, "frame_effects", value);

      } else if (key === "full_art") {
        if (typeof value === "boolean") {
          query.full_art = value;
        }
      }
    }
  }

  if (gating) {
    if (gating.released_at_match_parent) {
      let parentReleasedAt = releasedAt;
      if (!parentReleasedAt) {
        try {
          const parentSet = await SetModel.findOne({ code: setCode }).lean();
          if (!parentSet) {
            const error = new Error();
            error.statusCode = 404;
            error.details = "Unable to find matching Set in database";
            throw error;
          }
          parentReleasedAt = parentSet.released_at;
        } catch (error) {
          console.log("error:" + error.message);
        }
      }
      query["released_at"] = parentReleasedAt;
    }
      

    if (gating.allowed_scryfall_ids?.length) {
      query.scryfall_id = query.scryfall_id || {};
      query.scryfall_id.$in = gating.allowed_scryfall_ids;
    }

    if (gating.excluded_scryfall_ids?.length) {
      query.scryfall_id = query.scryfall_id || {};
      query.scryfall_id.$nin = gating.excluded_scryfall_ids;
    }
  }

  const hasValidFinish = (card, packType, finish) => {
    if (!finish || finish === "any") return true;

    // must be a finish the card actually has
    if (!card?.finishes?.includes(finish)) return false;

    const pe = card?.pack_eligibility;

    // If no override info, allow (default behaviour)
    if (!pe?.pack_types?.length && !pe?.finishes_by_pack_types) return true;

    // If pack_types exists, it must include this packType
    if (pe?.pack_types?.length && !pe.pack_types.includes(packType)) return false;

    // If finishes_by_pack_types has an entry for this packType, enforce it
    const allowedFinishes = pe?.finishes_by_pack_types?.[packType];
    if (Array.isArray(allowedFinishes) && allowedFinishes.length) {
      return allowedFinishes.includes(finish);
    }

    // otherwise, no restriction
    return true;

  };

  const shouldRejectCard = ({ card, finalRarity, finalFinish, packType, allowDup, chosenIds }) => {
    if (!card) return true;

    if (finalRarity !== "any" && card.rarity !== finalRarity) return true;

    if (!hasValidFinish(card, packType, finalFinish)) return true;

    if (!allowDup && chosenIds.includes(card._id)) return true;

    return false;
  };

  // fetch all matching cards to create a pool
  // console.log(`==> slot: ${slotCode} 🔍 final query: ${JSON.stringify(query)}`);
  const cards = await CardModel.find(query).lean();

  if (!cards.length) {
    throw new Error("No cards found matching the query criteria.");
  }

  const generatedCards = [];
  const chosenIds = [];

  if (batchGenerate) {

    // if batchGenerate, then use the same rarity and finish for all cards
    let finalRarity = "any";
    if (rarity) finalRarity = getRandomRarity(rarity);

    let finalFinish = "any";
    if (finish) finalFinish = getRandomFinish(finish);

    for (let i = 0; i < quantity; i++) {
      let attempts = 0;
      const maxAttempts = 800;   
      let card = null;
      while (shouldRejectCard({card, finalRarity, finalFinish, packType, allowDup, chosenIds})) {
        // prevent infinite loop
        if (++attempts > maxAttempts) {
          const counts = {
            total: cards.length,
            rarityOK: 0,
            finishOK: 0,
            packTypeOK: 0,
            eligibilityOK: 0,
            allOK: 0,
          };

          for (const c of cards) {
            const rarityOK = finalRarity === "any" || c.rarity === finalRarity;
            const finishOK = finalFinish === "any" || c.finishes?.includes(finalFinish);

            const packTypes = c.pack_eligibility?.pack_types;
            const packTypeOK = !Array.isArray(packTypes) || packTypes.length === 0 || packTypes.includes(packType);

            const allowed = c.pack_eligibility?.finishes_by_pack_types?.[packType];
            const eligibilityOK =
              !Array.isArray(allowed) || allowed.length === 0 || allowed.includes(finalFinish);

            if (rarityOK) counts.rarityOK++;
            if (finishOK) counts.finishOK++;
            if (packTypeOK) counts.packTypeOK++;
            if (eligibilityOK) counts.eligibilityOK++;
            if (rarityOK && finishOK && packTypeOK && eligibilityOK) counts.allOK++;
          }

          throw new Error(
            `Failed slot ${slotCode}. pool=${counts.total}, rarityOK=${counts.rarityOK}, finishOK=${counts.finishOK}, packTypeOK=${counts.packTypeOK}, eligibilityOK=${counts.eligibilityOK}, allOK=${counts.allOK}. finalRarity=${finalRarity}, finalFinish=${finalFinish}. Query=${JSON.stringify(query)}`
          );
        }
        const randomIndex = getRandomInt(0, cards.length - 1);
        card = cards[randomIndex];
      }
      
      let price_code = "usd";
      const cardFinish = finalFinish !== "any"
        ? finalFinish
        : card.finishes[Math.floor(Math.random() * card.finishes.length)];

      if (cardFinish === "foil") {
        price_code = "usd_foil";
      } else if (cardFinish === "etched") {
        price_code = "usd_etched";
      }

      // get special foil type if there is
      const specialFoils = card.promo_types.filter(p => p.includes("foil"));

      chosenIds.push(card._id);
      generatedCards.push({ 
        ...card, 
        finish: cardFinish, 
        note: note ? note : slotCode, 
        final_price: card.prices[price_code],
        special_foil_finishes = specialFoils.length ? [...specialFoils] : [], 
      });

    }

  } else {
    for (let i = 0; i < quantity; i++) {
      // if NOT batchGenerate, then reroll rarity and finish for each card
      let finalRarity = "any";
      if (rarity) finalRarity = getRandomRarity(rarity);

      let finalFinish = "any";
      if (finish) finalFinish = getRandomFinish(finish);

      let card = null;
      let attempts = 0;
      const maxAttempts = 300;   
      while (shouldRejectCard({card, finalRarity, finalFinish, packType, allowDup, chosenIds})) {
        // prevent infinite loop
        if (++attempts > maxAttempts) {
          const counts = {
            total: cards.length,
            rarityOK: 0,
            finishOK: 0,
            packTypeOK: 0,
            eligibilityOK: 0,
            allOK: 0,
          };

          for (const c of cards) {
            const rarityOK = finalRarity === "any" || c.rarity === finalRarity;
            const finishOK = finalFinish === "any" || c.finishes?.includes(finalFinish);

            const packTypes = c.pack_eligibility?.pack_types;
            const packTypeOK = !Array.isArray(packTypes) || packTypes.length === 0 || packTypes.includes(packType);

            const allowed = c.pack_eligibility?.finishes_by_pack_types?.[packType];
            const eligibilityOK =
              !Array.isArray(allowed) || allowed.length === 0 || allowed.includes(finalFinish);

            if (rarityOK) counts.rarityOK++;
            if (finishOK) counts.finishOK++;
            if (packTypeOK) counts.packTypeOK++;
            if (eligibilityOK) counts.eligibilityOK++;
            if (rarityOK && finishOK && packTypeOK && eligibilityOK) counts.allOK++;
          }

          throw new Error(
            `Failed slot ${slotCode}. pool=${counts.total}, rarityOK=${counts.rarityOK}, finishOK=${counts.finishOK}, packTypeOK=${counts.packTypeOK}, eligibilityOK=${counts.eligibilityOK}, allOK=${counts.allOK}. finalRarity=${finalRarity}, finalFinish=${finalFinish}. Query=${JSON.stringify(query)}`
          );
        }
        const randomIndex = getRandomInt(0, cards.length - 1);
        card = cards[randomIndex];
      }

      let price_code = "usd";
      const cardFinish = finalFinish !== "any"
        ? finalFinish
        : card.finishes[Math.floor(Math.random() * card.finishes.length)];

      if (cardFinish === "foil") {
        price_code = "usd_foil";
      } else if (cardFinish === "etched") {
        price_code = "usd_etched";
      }

      chosenIds.push(card._id);
      generatedCards.push({ 
        ...card, 
        finish: cardFinish, 
        note: note ? note : slotCode, 
        final_price: card.prices[price_code] 
      });

    }
  }

  // console.log(`${generatedCards.length} cards found`);
  return generatedCards;

};

const getRelatedCards = async (cardId) => {
  try {
    const card = await CardModel.findById(cardId);
    if (!card) {
      const error = new Error();
      error.details = "Unable to find matching User Card in database";
      error.statusCode = 404;
      throw error;
    }

    const cardName = card.card_faces[0].name;

    const relatedCards = await CardModel.find({ 
      "card_faces.0.name": cardName,
      _id: { $ne: cardId },
    }).lean();

    return relatedCards;

  } catch (error) {
    errorHandler(error);
  }
};

module.exports = { getRandomCards, getRelatedCards };