const UserCardModel = require("../models/userCardModel");
const CardModel = require("../models/cardModel");

const{ getRelatedCards } = require("../services/cardService");

const controller = {
  retrieveById: async (req, res, next) => {
    try {
      const card = await UserCardModel.findById(req.params.id)
        .populate({
          path: "card_id",
          populate : {
            path: "set_id",
            select: "_id code name icon_svg_uri"
          } 
        })
        .lean();

      if (!card) {
        const error = new Error();
        error.details = "Unable to find matching User Card in database";
        error.statusCode = 404;
        throw error;
      }

      if (card.finish === "foil") {
        card.final_price = card.card_id.prices["usd_foiled"];
      } else if (card.finish === "etched") {
        card.final_price = card.card_id.prices["usd_etched"];
      } else {
        card.final_price = card.card_id.prices["usd"];
      }

      const user_id = card.user_id;

      // find related card
      const related_cards = [];
      const relatedCards = await getRelatedCards(card.card_id._id);

      if (relatedCards.length > 0) {
        for await (const card of relatedCards) {
          const card_id = card._id;
          const matchingUserCard = await UserCardModel.find({ user_id, card_id });
          if (matchingUserCard) card.is_owned = true;
          related_cards.push(card);
        }
      }

      card.related_cards = related_cards;

      return res.status(200).json(card);

    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.details = "Error retrieving user card data " + error.message;
      }
      next(error);
    }
  },
};

module.exports = controller;

