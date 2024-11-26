import CardModel from "../models/cardModel";
import SetModel from "../models/setModel";

import { getRandomInt } from "../utils/randomUtils";
import { FINISHES_DROP_RATE } from "../utils/cardAttributes";

const getRandomFinish = (availableFinishes) => {
  if (finishes.length === 1) {
    return finishes[0];

  } else if (finishes.length === 0) {
    throw new Error("Missing finishes information from card.");

  } else {
    const filteredFinishes = FINISHES_DROP_RATE.filter((rate) => 
      availableFinishes.includes(rate.finish)
    );

    const chance = Math.random();
    let culmulativeRate = 0;

    for (const { finish, rate } of filteredFinishes) {
      culmulativeRate += rate;
      if (chance <= culmulativeRate) {
        return finish;
      }
    }

    // Default to the last available finish (fallback)
    return filteredRates[filteredRates.length - 1].finish;

  }
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

const getRandomCards = async ({ setCode, rarity, type = {}, quantity }) => {
  // validate the required parammeters
  if (!setCode || !rarity || !rarity.length) {
    throw new Error("setCode and rarity are required parameters.");
  }

  let setID = null;
  // get setID
  try {
    const set = await SetModel.findOne({ code: setCode });
    if (!set) {
      const error = new Error();
      error.statusCode = 404;
      error.details = "Unable to find matching Set in database";
      throw error;
    }
    setID = set._id;
  } catch (error) {
    next(error);
  }

  // build the MongoDB query
  const query = {
    set_id: setID,
    rarity: { $in: rarity }
  };

  // handle type inclusion
  if (type.include && type.include.length) {
    query.type_line = {
      $regex: type.include.map((t) => `(${t})`).join("|"),
      $options: "i", // Case-insensitive match
    };
  }

  // Handle type exclusion
  if (type.exclude && type.exclude.length) {
    query.type_line = query.type_line
      ? {
          $regex: query.type_line.$regex, // Keep the inclusion logic
          $options: query.type_line.$options,
          $not: {
            $regex: type.exclude.map((t) => `(${t})`).join("|"),
            $options: "i",
          },
        }
      : {
          $not: {
            $regex: type.exclude.map((t) => `(${t})`).join("|"),
            $options: "i",
          },
        };
  }

  // fetch all matching cards
  const cards = await CardModel.find(query);

  if (!cards.length) {
    throw new Error("No cards found matching the query criteria.");
  }

  const generatedCards = [];

  for (let i = 1; i <= quantity; i++) {
    const randomIndex = getRandomInt(0, cards.length - 1);
    const card = cards[randomIndex];

    const { finishes } = card;

    if (!finishes || !finishes.length) {
      throw new Error(`Card ${card.name} has no valid finishes.`);
    }

    const finish = getRandomFinish(finishes);
    generatedCards.push({ ...card.toObject(), finish });

  }

  return generatedCards;

};

module.exports = { getRandomCards };