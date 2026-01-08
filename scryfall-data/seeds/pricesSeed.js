require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const CardModel = require("../../models/cardModel");
const SetModel = require("../../models/setModel");

const SET_LIST = require("./setList");
const CARD_SEARCH_BY_SET_API = "https://api.scryfall.com/cards/search?q=set%3D";
const SPG_CARD_SEARCH_BY_RELEASE_DATE_API = "https://api.scryfall.com/cards/search?q=date%3D";

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

const getCardDataBySet = async (setCode, releaseDateStr = null) => {
  let api = null;
  if (releaseDateStr) {
    api = SPG_CARD_SEARCH_BY_RELEASE_DATE_API + releaseDateStr + "+set%3A" + setCode + "&unique=prints";
  } else {
    api = CARD_SEARCH_BY_SET_API + setCode + "&unique=prints";
  }

  let data = [];
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

const seedCardPricesBySet = async (data, setCode) => {
  try {
    console.log(`${data.length} cards retrieved from scryfall`);

    for (const scryfallCard of data) {
      const { id: scryfall_id, prices } = scryfallCard;

      const card = await CardModel.findOne({ scryfall_id });

      if (card) {
        // Update prices and prices_updated_at fields
        card.prices = {
          usd: prices.usd || card.prices?.usd || null,
          usd_foil: prices.usd_foil || card.prices?.usd_foil || null,
          usd_etched: prices.usd_etched || card.prices?.usd_etched || null,
        };

        card.prices_updated_at = new Date();

        // Save the updated card
        await card.save();
        // console.log(`Updated card with ID: ${scryfall_id}`);
      
      } else {
        console.log(`Card with scryfall_id ${scryfall_id} not found in database.`);
      }
    }

    console.log(`==> ✅ All ${data.length} cards from set ${setCode} have been seeded successfully.`);
  } catch (error) {
    console.error(`Error during seedData for set ${setCode}: ${error.message}`);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDb();

  console.log("Card prices data seeding...");

  for await (const set of SET_LIST) {
    try {
      const { code, hasSpg, spgCode, collectorOnly } = set;
      console.log(`Card prices from set ${code} seeding...`);
      const mainSetData = await getCardDataBySet(code);
      await seedCardPricesBySet(mainSetData, code);

      if (hasSpg) {
        const code = spgCode ? spgCode : "spg";
        console.log(`Card prices from set ${code} seeding...`);
        const releaseDateStr = mainSetData[0].released_at;
        const spgSetData = await getCardDataBySet(code, releaseDateStr);
        await seedCardPricesBySet(spgSetData, code);
      }

    } catch (error) {
      process.exit(1);
    }
  }

  process.exit(0);
};

seed();