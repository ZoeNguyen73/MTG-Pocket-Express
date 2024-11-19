require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

// to import Card Model
const SetModel = require("../../models/setModel");

const SET_LIST = require("./setList");
const CARD_SEARCH_BY_SET_API = "https://api.scryfall.com/cards/search?q=set%3D";

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

const getCardDataBySet = async (setCode) => {
  const api = CARD_SEARCH_BY_SET_API + setCode;
  const data = [];
  let response = null;

  try {
    response = await axios.get(api);
    if (!response.data) {
      throw new Error("No data found in response.");
    }

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error("No card data found in response data.");
    }

    data = data.concat(response.data.data);

    while (response.data.has_more) {
      response = await axios.get(response.data.next_page);
      if (!response.data) {
        throw new Error("No data found in response.");
      }

      if (!response.data.data || response.data.data.length === 0) {
        throw new Error("No card data found in response data.");
      }

      data = data.concat(response.data.data);
    }

    return data;
    
  } catch (error) {
    console.error(`Unable to get card data for set ${setCode}: ${error.message}`);
    process.exit(1);
  }
};

const getSetId = async (setCode) => {
  try {
    const set = await SetModel.findOne({ code: setCode });
    if (!set) {
      throw new Error(`No set found in database with code ${setCode}`);
    }

    return set._id;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

const seedData = async (cardData, setCode) => {
  if (!Array.isArray(cardData) || cardData.length === 0) {
    throw new Error("Card data is empty or invalid.");
  }

  let setId = null;
  try {
    setId = await getSetId(setCode);
  } catch (error) {
    console.error(error.message);
  }
  
  const formattedCards = cardData.map(card => ({
    scryfall_id: card.id,
    name: card.name,
    lang: card.lang,
    scryfall_uri: card.scryfall_uri,
    layout: card.layout,
    highres_image: card.highres_image,
    image_png: card.image_uris.png,
    image_jpg_normal: card.image_uris.normal,
    image_border_crop: card.image_uris.border_crop,
    border_color: card.border_color,
    reserved: card.reserved,
    foil: card.foil,
    nonfoil: card.nonfoil,
    oversized: card.oversized,
    promo: card.promo,
    reprint: card.reprint,
    variation: card.variation,
    variation_of: card.variation_of || null,
    digital: card.digital,
    full_art: card.full_art,
    textless: card.textless,
    booster: card.booster,
    rarity: card.rarity,
    frame: card.frame,
    set_id: setId,
    price_usd: card.prices.usd,
    prices_usd_foil: card.prices.usd_foil,
    prices_usd_etched: card.prices.usd_etched,
  }));

  try {
    await ItemModel.insertMany(formattedCards);
    console.log(`All cards from set ${setCode} have been seeded successfully.`);
  } catch (error) {
    console.error(`Error during bulk insert for set ${setCode}: ${error.message}.`);
  }
};

const seed = async () => {
  await connectDb();

  console.log("Cards data seeding...");

  for await (const setCode of SET_LIST) {
    try {
      const data = await getCardDataBySet(setCode);
      await seedData(data, setCode);
    } catch (error) {
      process.exit(1);
    }
  }

  process.exit(0);
};

seed();