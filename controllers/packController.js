import getRandomCards from "../services/cardService";
import BOOSTER_TYPES from "../utils/boosterTypes";

const controller = {
  open: async (req, res, next) => {
    const { setCode, packType } = req.params;
    console.log("packController open function...");
    console.log("setCode: ", setCode, ", packType: ", packType);

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

      const data = {
        card_quantity: results.length,
        cards: results,
      };

      return res.json(data);
      
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
        error.details = "Invalid input due to error: " + error.message;
      }
      next(error);
    }
  },
};

module.exports = controller;