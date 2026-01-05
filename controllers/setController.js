const SetModel = require("../models/setModel");
const CardModel = require("../models/cardModel");
const TopCardModel = require("../models/topCardModel");

const getTopCards = async (setId) => {
  const topCards = await TopCardModel.find({ set_id: setId })
    .populate("card_id")
    .lean();

  const playBoosterTopCards = [];
  const collectorBoosterTopCards = [];

  for (const card of topCards) {
    let price_code = "usd";

    if (card.finish === "foil") {
      price_code = "usd_foil";
    } else if (card.finish === "etched") {
      price_code = "usd_etched";
    }
    card.final_price = card.card_id.prices[price_code];

    if (card.pack_type === "play_booster") {
      playBoosterTopCards.push(card);
    } else if (card.pack_type === "collector_booster") {
      collectorBoosterTopCards.push(card);
    }
  }

  return { playBoosterTopCards, collectorBoosterTopCards };
};

const controller = {
  retrieveBySetCode: async (req, res, next) => {
    try {
      const set = await SetModel.findOne({ code: req.params.setCode }).lean();
      const includeTopCards = req.query?.["top-cards"] ? req.query?.["top-cards"] : false;

      if (!set) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
      }

      const cardCount = await CardModel.countDocuments({ set_id: set._id });
      set.card_count = cardCount;

      if (includeTopCards) {
        const { playBoosterTopCards, collectorBoosterTopCards } = await getTopCards(set._id);
        set.top_cards = {};
        set.top_cards.play_booster = {
          count: playBoosterTopCards.length,
          cards: playBoosterTopCards,
        };
        set.top_cards.collector_booster = {
          count: collectorBoosterTopCards.length,
          cards: collectorBoosterTopCards
        }
      }

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

      const { playBoosterTopCards, collectorBoosterTopCards } = await getTopCards(set._id);
      const data = {
        set_code: set.code,
        top_cards: {
          play_booster: {
            count: playBoosterTopCards.length,
            cards: playBoosterTopCards,
          },
          collector_booster: {
            count: collectorBoosterTopCards.length,
            cards: collectorBoosterTopCards,
          }
        }
      };
      return res.status(200).json(data)

    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;