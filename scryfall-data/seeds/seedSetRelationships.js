require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const SetRelationship = require("../../models/setRelationship");

const FILE_PATH = path.join(__dirname, "./seedRelationships/setRelationships.json");

const connectDB = async () => {
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
  await connectDB();

  console.log("Seeding set relationship data...");

  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    const relationships = JSON.parse(raw);

    let upserted = 0;
    let modified = 0;

    for (const rel of relationships) {
      const {
        parent_set_code,
        child_set_code,
        relationship_type,
        is_active = true,
        rules = {}
      } = rel;

      if (!parent_set_code || !child_set_code) {
        console.warn("⚠️ Skipping invalid relationship:", rel);
        continue;
      }

      const filter = { parent_set_code, child_set_code, relationship_type };

      const update = {
        $set: {
          parent_set_code,
          child_set_code,
          relationship_type,
          is_active,
          rules: {
            released_at_match_parent: !!rules.released_at_match_parent,
            allowed_card_ids: rules.allowed_card_ids || [],
            excluded_card_ids: rules.excluded_card_ids || [],
          },
        },
      };

      const result = await SetRelationship.updateOne(filter, update, {
        upsert: true,
      });

      if (result.upsertedCount) upserted += result.upsertedCount;
      if (result.modifiedCount) modified += result.modifiedCount;

    }

    console.log(`✅ Done. Upserted: ${upserted}, Modified: ${modified}`);

  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(1);
  }
};

seed();