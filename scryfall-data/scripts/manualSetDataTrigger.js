const { fetchSetData } = require("./downloadData");

(async () => {
  console.log("Triggering Scryfall script...");
  await fetchSetData();
  console.log("Script execution completed.")
})();