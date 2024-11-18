const axios = require("axios");
const fs = require("fs"); // For createWriteStream
const fsPromises = require("fs/promises"); // For async/await APIs
const path = require("path");
const { Readable } = require("stream");

const CARD_DATA_API_URL = "https://api.scryfall.com/bulk-data";
const CARD_DATA_DIR = path.join(__dirname, "../card-data");
const SET_DATA_API_URL = "https://api.scryfall.com/sets";
const SET_DATA_DIR = path.join(__dirname, "../set-data");
const LOG_FILE = path.join(__dirname, "../log.json");

const logFileUpdate = async (fileName, fileType) => {
  const timestamp = new Date().toISOString();

  // create log entry
  const logEntry = {
    fileType,
    fileName,
    timestamp,
  };

  try {
    // ensure the log file exists or create it
    if (!fs.existsSync(LOG_FILE)) {
      await fsPromises.writeFile(LOG_FILE, JSON.stringify([logEntry], null, 2));
    } else {
      // read existing log data
      const logData = JSON.parse(await fsPromises.readFile(LOG_FILE, "utf8"));

      // append the new log entry
      logData.push(logEntry);

      // write updated log data back to the file
      await fsPromises.writeFile(LOG_FILE, JSON.stringify(logData, null, 2));
    }

    console.log(`Log updated: ${fileType} ${fileName} at ${timestamp}`);

  } catch (error) {
    console.error("Error updating log file:", error.message);
  }
};

const clearDataFolder = async (dataType) => {
  let currentDir;
  if (dataType === "card") {
    currentDir = CARD_DATA_DIR;
  } else if (dataType === "set") {
    currentDir = SET_DATA_DIR;
  } else {
    throw new Error("Invalid dataType provided for clearingDataFolder.");
  }

  try {
    console.log("Clearing old files in the data folder...");
    const files = await fsPromises.readdir(currentDir);

    for (const file of files) {
      await fsPromises.unlink(path.join(currentDir, file));
      console.log("Deleted old file: " + file);
    }

  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error clearning data folder: ", error.message);
    }
  }
};

const fetchBulkCardData = async () => {
  try {
    console.log("Fetching bulk card data from Scryfall...");
    const response = await axios.get(CARD_DATA_API_URL);

    if (!response.data) {
      throw new Error("No data found in response.");
    }

    const filtered = response.data.data.filter(item => item.type === "default_cards");
    
    if (filtered.length === 0 || !filtered[0].download_uri) {
      throw new Error("No suitable download_uri found in response.");
    }

    const download_uri = filtered[0].download_uri;
    console.log("Download URI for default cards: " + download_uri);

    await clearDataFolder("card");

    await downloadAndSaveCardDataFile(download_uri);

    console.log("Data download completed successfully.");

  } catch (error) {
    console.error("Error fetching bulk card data: " + error.message);
  }
};

const downloadAndSaveCardDataFile = async (downloadUri) => {
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
  const filePath = path.join(CARD_DATA_DIR, fileName);

  try {
    // ensure the data directory exists
    await fsPromises.mkdir(CARD_DATA_DIR, { recursive: true });

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

      writeStream.on("finish", async () => {
        console.log("File successfully saved to:", filePath);

        // Log the file creation after the file is saved successfully
        try {
          await logFileUpdate(fileName, "card");  // Log file details
          resolve(); // Resolve the Promise after logging

        } catch (logError) {
          reject(new Error("Failed to log file creation."));
        }
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

const fetchSetData = async () => {
  let response = null;
  try {
    console.log("Fetching set data from Scryfall...");
    response = await axios.get(SET_DATA_API_URL);

    if (!response.data) {
      throw new Error("No data found in response.");
    }

  } catch (error) {
    console.error("Error fetching set data from Scryfall: " + error.message);
  }

  // clear current data
  await clearDataFolder("set");

  const fileName = "scryfall_sets.json";
  const filePath = path.join(SET_DATA_DIR, fileName);

  try {
    // Ensure the data directory exists
    await fs.promises.mkdir(SET_DATA_DIR, { recursive: true });

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);

      // convert json object to a string stream
      const jsonStream = Readable.from([JSON.stringify(response.data.data, null, 2)]);

      // pipe
      jsonStream.pipe(writeStream);

      writeStream.on("finish", async () => {
        console.log("File successfully saved to: ", filePath);

        // log
        try {
          await logFileUpdate(fileName, "set");
          resolve();
        } catch (error) {
          reject(new Error("Failed to log file creation."));
        }
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

module.exports = { fetchBulkCardData, fetchSetData };