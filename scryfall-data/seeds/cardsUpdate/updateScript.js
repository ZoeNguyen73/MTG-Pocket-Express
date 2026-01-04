require("dotenv").config();
const mongoose = require("mongoose");

const UPDATES = require("./updates");

const CardModel = require("../../../models/cardModel");

const SET_IDS = [
  // "6948ef35014198a4bcfa80a3", // mar
  "6948ef35014198a4bcfa809c", // tle
  // "6948ef35014198a4bcfa811f", // spg
]

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

const seed = async () => {
  await connectDb();

  console.log("Seeding card updates...");

  for (const update of UPDATES) {
    if (update.completed) continue;

    const { field, value, cards } = update;
    if (!Array.isArray(cards) || cards.length === 0) {
      console.log(`⏭️  Skipping update for ${field} (no cards).`);
      continue;
    }

    console.log(`🔍 updating field ${field} with value ${JSON.stringify(value)} for ${cards.length} cards...`);
    
    try {
      const filter = { scryfall_id: { $in: cards } };

      // If value is an array, add each element; otherwise add the single value
      const updateDoc = Array.isArray(value)
        ? { $addToSet: { [field]: { $each: value } } }
        : { $addToSet: { [field]: value } };

      const result = await CardModel.updateMany(filter, updateDoc);

      console.log(`==> ✅ matched: ${result.matchedCount ?? result.n}, modified: ${result.modifiedCount ?? result.nModified}`);

    } catch (error) {
      console.error(`==> ❌ Error during bulk updating cards for ${field}: ${error.message}.`);
      process.exit(1);
    }
  }
  
  console.log("✅ Done.");
  process.exit(0);
};

const seed2 = async () => {
  await connectDb();

  console.log("Seeding card updates...");

  try {
    const field = "pack_eligibility.finishes_by_pack_types.collector_booster";
    const result = await CardModel.updateMany(
      { set_id: { $in: SET_IDS}},
      { $addToSet: { [field]: "foil"} }
    )

    console.log(`==> ✅ matched: ${result.matchedCount ?? result.n}, modified: ${result.modifiedCount ?? result.nModified}`);
  } catch (error) {
    console.error(`==> ❌ Error during bulk updating cards: ${error.message}.`);
    process.exit(1);
  }
  console.log("✅ Done.");
  process.exit(0);

};

seed();