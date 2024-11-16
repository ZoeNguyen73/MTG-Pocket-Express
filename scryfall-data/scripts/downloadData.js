const axios = require("axios");
const { response } = require("express");
const fs = require("fs/promises");
const path = require("path");

const API_URL = "https://api.scryfall.com/bulk-data";
const DATA_DIR = path.join(__dirname, "../data");

const fetchBulkData = async () => {
  try {
    console.log("Fetching bulk data from Scryfall...");
    const response = await axios.get(API_URL);

    if (!response.data) {
      throw new Error("No data found in response.");
    }

    const filtered = response.data.filter(item => item.type === "default_cards");
    
    if (filtered.length === 0 || !filtered[0].download_uri) {
      throw new Error("No suitable download_uri found in response.");
    }

    const download_uri = filtered[0].download_uri;
    console.log("Download URI for default cards: " + download_uri);

    await clearDataFolder();

    await downloadAndSaveFile(download_uri);

    console.log("Data download completed successfully.");

  } catch (error) {
    console.error("Error fetching bulk data: " + error.message);
  }
};

const clearDataFolder = async () => {
  try {
    console.log("Clearing old files in the data folder...");
    const files = await fs.readdir(DATA_DIR);

    for (const file of files) {
      await fs.unlink(path.join(DATA_DIR, file));
      console.log("Deleted old file: " + file);
    }

  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error clearning data folder: ", error.message);
    }
  }
};

const downloadAndSaveFile = async (downloadUri) => {
  const response = await axios({
    method: "get",
    url: downloadUri,
    responseType: "stream",
  });

  const fileName = path.basename(uri);
  const filePath = path.join(DATA_DIR, fileName);

  // ensure the data directory exists
  await fs.mkdir(DATA_DIR, { recursive: true });

  /*
  Promise is used instead of try-catch because
  fs.createWriteStream emits events (finish, error)
  to signal success or failure. these events happen asynchronously
  and are not caught by try-catch

  by wrapping the stream logic in a Promise, we can explicitly
  resolve the Promise when the stream finishes and reject it
  when an error occurs.
  */
  return new Promise((resolve, reject) => {
    const writeStream = require("fs").createWriteStream(filePath);

    response.data.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);

    console.log("File saved to: " + filePath);
  });
};

module.exports = { fetchBulkData };