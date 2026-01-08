require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const TopCardModel = require("../../models/topCardModel");
const SetModel = require("../../models/setModel");
const CardModel = require("../../models/cardModel");

const TOP_CARD_LIST = require("./topCardList");
const SPG_SETS = ["spg", "mar", "tle"];

const connectDb = async () => {
  try {

    if (!process.env.MONGO_DB_STRING) {
      throw new Error("MONGO_DB_STRING is not defined in the environment variables.");
    }

    await mongoose.connect(process.env.MONGO_DB_STRING, { dbName: process.env.DB_NAME });
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Failed to connect to DB: ${error}`);
    process.exit(1);
  }
};

const getSetId = async (setCode) => {
  const set = await SetModel.findOne({ code: setCode }).lean();
  return set._id;
};

const getCardIdAndSetCode = async (cardScryfallId) => {
  const card = await CardModel.findOne({scryfall_id: cardScryfallId})
    .populate("set_id", "code")
    .lean();

  return {cardId: card._id, setCode: card.set_id.code};
};

const seed = async () => {
  await connectDb();

  console.log("Top Cards data seeding...");

  try {
    const cardList = [];

    for await (const [key, value] of Object.entries(TOP_CARD_LIST)) {
      const setCode = key;
      const set_id = await getSetId(setCode);
      console.log(`==> Start seeding for set ${setCode} - id: ${set_id}`);

      for (const i of value) {
        const { pack_type, cards } = i;
        console.log(`====> Start seeding for ${pack_type}`);
        for (const card of cards) {
          let finish = "foil";
          const { cardId, setCode } = await getCardIdAndSetCode(card);
          if (pack_type === "play_booster" && SPG_SETS.includes(setCode)) finish = "nonfoil";
          cardList.push({card_id: cardId, set_id, pack_type: pack_type, finish});
        }
      }
    }

    await TopCardModel.insertMany(cardList);
    console.log(`==> ✅ All ${cardList.length} top cards have been seeded successfully.`);

  } catch (error) {
    console.error(`==> ❌ Error during bulk insert top cards: ${error.message}.`);
    process.exit(1);
  } 

  process.exit(0);
};

seed();
