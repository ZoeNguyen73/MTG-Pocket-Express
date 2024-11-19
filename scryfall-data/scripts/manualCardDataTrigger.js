const { fetchBulkCardData } = require("./downloadData");

(async () => {
  console.log("Triggering Scryfall script...");
  await fetchBulkCardData();
  console.log("Script execution completed.")
})();