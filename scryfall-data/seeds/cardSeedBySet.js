require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const CardModel = require("../../models/cardModel");
const SetModel = require("../../models/setModel");

const SET_LIST = require("./setList");
const CARD_SEARCH_BY_SET_API = "https://api.scryfall.com/cards/search?q=set%3D";
const layoutCardFaceMapping = require("../../utils/cardLayoutsMapping");

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
  const api = CARD_SEARCH_BY_SET_API + setCode + "&unique=prints";
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
  
  const formattedCards = cardData.map(card => {
    const card_faces = [];
    
    if (layoutCardFaceMapping[card.layout] === 1) {
      const face = {
        name: card.name,
        image_small: card.image_uris.small,
        image_png: card.image_uris.png,
        image_jpg_normal: card.image_uris.normal,
        image_border_crop: card.image_uris.border_crop,
        layout: card.layout,
        type_line: card.type_line,
      };
      card_faces.push(face);
    } else if (layoutCardFaceMapping[card.layout] > 1) {
      for (let i = 0; i < card.card_faces.length; i++) {
        const data = card.card_faces[i];
        const face = {
          name: data.name,
          image_small: data.image_uris.small,
          image_png: data.image_uris.png,
          image_jpg_normal: data.image_uris.normal,
          image_border_crop: data.image_uris.border_crop,
          layout: data.layout || null,
          type_line: data.type_line || null,
        };
        card_faces.push(face);
      }
    }

    const formattedCard = {
      scryfall_id: card.id,
      lang: card.lang,
      scryfall_uri: card.scryfall_uri,
      layout: card.layout,
      card_faces,
      highres_image: card.highres_image,
      border_color: card.border_color,
      reserved: card.reserved,
      finishes: [...card.finishes],
      oversized: card.oversized,
      promo: card.promo,
      reprint: card.reprint,
      digital: card.digital,
      full_art: card.full_art,
      textless: card.textless,
      booster: card.booster,
      rarity: card.rarity,
      frame: card.frame,
      set_id: setId,
    };

    return formattedCard;
    
  });

  try {
    await CardModel.insertMany(formattedCards);
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