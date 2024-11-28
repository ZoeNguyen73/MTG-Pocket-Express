const { getRandomCards } = require("../services/cardService");
const BOOSTER_TYPES = require("../utils/boosterTypes");

const SetModel = require("../models/setModel");
const UserCardModel = require("../models/userCardModel");
const UserCardValidator = require("../validations/userCardValidation");

const updateUserCard = async (user_id, card, quantity = 1) => {
  const card_id = card._id.toString();
  const finish = card.finish;

  try {
    await UserCardValidator.update.validateAsync({
      user_id,
      card_id,
      finish,
      quantity
    });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }

  try {
    await UserCardModel.updateOne(
      { user_id, card_id, finish },
      { $inc: { quantity } },
      { upsert: true }
    )
  } catch (error) {
    next(error);
  }
};

const controller = {
  open: async (req, res, next) => {
    const { setCode, packType } = req.params;

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
      // find matching booster type
      if (BOOSTER_TYPES.filter(type => type.code === packType).length === 0) {
        throw new Error("Unable to find matching booster type");
      }

      // get card distributions information for the booster type
      const distributions = BOOSTER_TYPES.filter(type => type.code === packType)[0].distributions;
      if (!distributions || !distributions.length) {
        throw new Error("Missing distributions information for this booster type");
      }

      // looping through the distributions to generate cards
      let results = [];
      for (let i = 0; i < distributions.length; i++) {
        const dist = distributions[i];
        const cards = await getRandomCards({
          setCode,
          rarity: dist.rarity,
          type: dist.type_line || {},
          quantity: dist.quantity,
        });
        results = results.concat(cards);
      }

      const user_id = req.authUser.userID;

      for await (const card of results) {
        try {
          await updateUserCard(user_id, card);
        } catch (error) {
          next(error);
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