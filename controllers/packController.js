const { getRandomCards } = require("../services/cardService");

const SetModel = require("../models/setModel");
const UserCardModel = require("../models/userCardModel");
const PackRuleModel = require("../models/packRuleModel");

const { updateUserCard } = require("../services/userCardService");
const { getRandomOptionWeighted } = require("../utils/randomUtils");

const controller = {
  open: async (req, res, next) => {
    const { setCode, packType } = req.params;
    const formattedPackType = packType.replace("-", "_");
    
    let set = null;
    try {
      set = await SetModel.findOne({ code: setCode });
      if (!set) {
        const error = new Error();
        error.details = "Unable to find matching Set in database";
        error.statusCode = 404;
        throw error;
      }

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
        error.details = "Invalid input due to error: " + error.message;
      }
      next(error);
    }

    try {
      // find matching active pack rule
      const packRule = await PackRuleModel.findOne({ set_code: setCode, booster_type: formattedPackType });
      if (!packRule || !packRule.is_active) {
        throw new Error("Unable to find matching active pack rule");
      }

      if (!packRule.slots || packRule.slots.length === 0) {
        throw new Error("Missing slots logic in pack rules")
      }

      let results = [];

      // looping through slots
      for (const slot of packRule.slots) {
        // console.log("slot: " + JSON.stringify(slot));
        const {slot_code, quantity, sources, allow_duplicates } = slot;

        if (sources.length === 0) continue;

        // need to check if there are more than 1 sources
        // and that quantity > 1
        // if yes, then need to do one by one instead of batch generate
        // do one by one so that the rarity/finish can be re-rolled every time

        // if can use single pool for all cards in slot
        if (sources.length === 1) {
          const cards = await getRandomCards({ 
            releasedAt: set.released_at, 
            setCode, 
            setId: set._id, 
            pool: sources[0], 
            quantity, 
            allowDup: allow_duplicates,
            packType: formattedPackType,
            slotCode: slot_code,   
          });
          results = results.concat(cards);
        
        } else {
          // if have to re-roll to select pool for each card in the slot
          const matrix = {};
          for (let i = 0; i < sources.length; i++) {
            matrix[i] = sources[i].weight;
          }

          for (let j = 0; j < quantity; j++) {
            const finalPool = sources[getRandomOptionWeighted(matrix)];
            const cards = await getRandomCards({ 
              releasedAt: set.released_at, 
              setCode, 
              setId: set._id, 
              pool: finalPool, 
              quantity: 1,
              packType: formattedPackType,
              slotCode: slot_code,  
            });
            results = results.concat(cards);
          }
        }
      }

      // update userCard if the user is not guest
      if (req.authUser !== "guest") {
        const user_id = req.authUser.userID;

        for await (const card of results) {
          try {
            const existingCards = await UserCardModel.find({user_id, card_id: card._id});
            if (existingCards.length === 0) card.is_new = true;
            await updateUserCard(user_id, card);
          } catch (error) {
            next(error);
          }
        }
      }
      
      const data = {
        set,
        card_quantity: results.length,
        cards: results,
      };

      return res.json(data);
      
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.details = "Error generating cards from pack: " + error.message;
      }
      next(error);
    }
  },
};

module.exports = controller;