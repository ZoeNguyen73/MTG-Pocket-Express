require("dotenv").config();
const mongoose = require("mongoose");

const TopCardModel = require("../../models/topCardModel");
const SetModel = require("../../models/setModel");
const CardModel = require("../../models/cardModel");

const TOP_CARD_LIST = require("./topCardList");

const connectDb = async () => {
  try {

    if (!process.env.MONGO_DB_STRING) {
      throw new Error("MONGO_DB_STRING is not defined in the environment variables.");
    }

    await mongoose.connect(process.env.MONGO_DB_STRING, { dbName: "MTG-Pocket" });
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Failed to connect to DB: ${error}`);
    process.exit(1);
  }
};

const getSetId = async (setCode) => {
  const set = await SetModel.findOne({ code: setCode });
  return set._id;
};

const getCardId = async (cardScryfallId, setId) => {
  const card = await CardModel.findOne({
    set_id: setId,
    scryfall_id: cardScryfallId
  })
  return card._id;
};

const seedSetTopCards = async (set_id, cards) => {
  for await (const card of cards) {
    const card_id = await getCardId(card.scryfall_id, set_id);
    await TopCardModel.create({ card_id, set_id, finish: card.finish });
    console.log(`created newTopCard: ${set_id} = ${card.scryfall_id}`);
  }
};

const seed = async () => {
  await connectDb();

  console.log("Top Cards data seeding...");

  for await (const [key, value] of Object.entries(TOP_CARD_LIST)) {
    const setCode = key;
    const cards = value;

    const set_id = await getSetId(setCode);
    console.log("set_id: " + set_id);

    await seedSetTopCards(set_id, cards);
  }

  process.exit(0);
};

seed();
