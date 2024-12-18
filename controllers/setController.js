const SetModel = require("../models/setModel");
const CardModel = require("../models/cardModel");
const TopCardModel = require("../models/topCardModel");

const controller = {
  retrieveBySetCode: async (req, res, next) => {
    try {
      const set = await SetModel.findOne({ code: req.params.setCode }).lean();

      if (!set) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      const cardCount = await CardModel.countDocuments({ set_id: set._id });
      set.card_count = cardCount;

      return res.status(200).json(set);

    } catch (error) {
      next(error);
    }
  },

  retrieveTopCardsBySetCode: async (req, res, next) => {
    try {
      const set = await SetModel.findOne({ code: req.params.setCode }).lean();

      if (!set) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      const topCards = await TopCardModel.find({ set_id: set._id })
        .populate("card_id")
        .lean();

      const data = { count: topCards.length, top_cards: topCards };
      return res.status(200).json(data)

    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;