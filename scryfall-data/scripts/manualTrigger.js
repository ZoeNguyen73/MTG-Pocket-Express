const { fetchBulkData } = require("./downloadData");

(async () => {
  console.log("Triggering Scryfall script...");
  await fetchBulkData();
  console.log("Script execution completed.")
})();