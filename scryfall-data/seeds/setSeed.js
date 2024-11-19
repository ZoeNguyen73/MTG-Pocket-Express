require("dotenv").config();
const mongoose = require("mongoose");
const fsPromises = require("fs/promises"); // For async/await APIs
const path = require("path");

const SetModel = require("../../models/setModel");

const LOG_FILE = path.join(__dirname, "../log.json");

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

const getLatestSetDataFileName = async (logFile) => {
  try {
    await fsPromises.access(logFile);
    const logData = JSON.parse(await fsPromises.readFile(logFile, "utf8"));
    const latestSetLog = logData.reverse().find((log) => log.fileType === "set");
    return latestSetLog?.fileName || null;
  } catch (error) {
    throw new Error("Error accessing or parsing the log file.");
  }
};

const seedData = async (setDataFile) => {
  const setData = require(setDataFile);
  if (!Array.isArray(setData) || setData.length === 0) {
    throw new Error("Set data file is empty or invalid.");
  }

  const formattedSets = setData.map(set => ({
    code: set.code,
    name: set.name,
    scryfall_uri: set.scryfall_uri,
    released_at: set.released_at,
    set_type: set.set_type,
    card_count: set.card_count,
    digital: set.digital,
    nonfoil_only: set.nonfoil_only,
    foil_only: set.foil_only,
    icon_svg_uri: set.icon_svg_uri,
    scryfall_id: set.id,
  }));

  try {
    await SetModel.insertMany(formattedSets);
    console.log("All sets have been seeded successfully.");
  } catch (error) {
    console.error("Error during bulk insert: ", error.message);
  }
};

const seed = async () => {
  await connectDb();

  console.log("Sets data seeding...");

  try {
    const fileName = await getLatestSetDataFileName(LOG_FILE);
    const SET_DATA_FILE = path.join(__dirname, `../set-data/${fileName}`);
    await seedData(SET_DATA_FILE);
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(1);
  }

};

seed();