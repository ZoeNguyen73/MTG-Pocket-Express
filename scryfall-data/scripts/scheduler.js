const schedule = require("node-schedule");
const { fetchBulkData } = require("./downloadData");

// schedule to run every 24 hours
schedule.scheduleJob("0 0 * * *", async () => {
  console.log("Scheduled job started...");
  await fetchBulkData();
});

// allow manual trigger
(async() => {
  if (process.argv.includes("--run-now")) {
    console.log("Manual trigger initiated...");
    await fetchBulkData();
  }
})();