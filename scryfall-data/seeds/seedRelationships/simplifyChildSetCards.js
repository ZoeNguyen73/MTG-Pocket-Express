const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");

const CHILD_SET_CARDS_DATA_FILENAME = "cid";
const INPUT_PATH = path.join(__dirname, `./${CHILD_SET_CARDS_DATA_FILENAME}.json`);

const simplifyChildSetCardsData = () => {
  if (!fs.existsSync(INPUT_PATH)) throw new Error(`Missing input file: ${INPUT_PATH}`);
  const outputName = `${CHILD_SET_CARDS_DATA_FILENAME}-simplified.json`;
  const outputPath = path.join(__dirname, `./${outputName}`);

  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  const parsed = JSON.parse(raw);

  const cardsArr = parsed.data ?? [];
  const simplifiedArr = cardsArr.map(card => card.id);

  fs.writeFileSync(outputPath, JSON.stringify(simplifiedArr, null, 2), "utf8");
  console.log(`Successfully simplified card data to ${outputPath}`);
};

(() => {
  console.log("Triggering simplification script...");
  simplifyChildSetCardsData();
  console.log("execution completed.");
})();