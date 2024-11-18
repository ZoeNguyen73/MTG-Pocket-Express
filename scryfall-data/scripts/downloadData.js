const axios = require("axios");
const fs = require("fs"); // For createWriteStream
const fsPromises = require("fs/promises"); // For async/await APIs
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

    const filtered = response.data.data.filter(item => item.type === "default_cards");
    
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
    const files = await fsPromises.readdir(DATA_DIR);

    for (const file of files) {
      await fsPromises.unlink(path.join(DATA_DIR, file));
      console.log("Deleted old file: " + file);
    }

  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error clearning data folder: ", error.message);
    }
  }
};

const downloadAndSaveFile = async (downloadUri) => {
  let response = null;

  try {
    response = await axios({
      method: "get",
      url: downloadUri,
      responseType: "stream",
    });
  } catch (error) {
    console.error("Error fetching data from URI:", downloadUri);
    console.error("Error details:", error.message);
    throw new Error("Failed to fetch data. Please check the download URI and try again.");
  }
  
  const fileName = path.basename(downloadUri);
  const filePath = path.join(DATA_DIR, fileName);

  try {
    // ensure the data directory exists
    await fsPromises.mkdir(DATA_DIR, { recursive: true });

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
      const writeStream = fs.createWriteStream(filePath);

      /*
      pipe method is used to connect 2 streams
      eg: a readable stream and a writable stream
      data flows automatically from the readable stream to the writable stream
      it auto handles backpressure (ensure writable stream is not overwhelmed)
      */
      // Pipe the response stream into the writable stream
      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("File successfully saved to:", filePath);
        resolve();
      });

      writeStream.on("error", (err) => {
        console.error("Error writing file:", err.message);
        reject(new Error("Failed to write the file to disk."));
      });

    });

  } catch (error) {
    console.error("Error during file saving process:", error.message);
    throw new Error("Failed to save the file. Please check file system permissions.");
  }
  
};

module.exports = { fetchBulkData };