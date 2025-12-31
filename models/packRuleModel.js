const mongoose = require("mongoose");

const { PACK_TYPES } = require("../utils/boosterTypes");
const { RARITY, FINISHES }  = require("../utils/cardAttributes");

/**
 * Small helper sub-schema for weighted choices:
 * e.g. { common: 55, uncommon: 38, rare: 6, mythic: 1 }
 */
const weightedMapSchema = new mongoose.Schema(
  {
    // Use Mixed so you can store { "common": 55, "uncommon": 38 } etc.
    // Keep validation in code for flexibility.
    weights: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const filtersSchema = new mongoose.Schema({
  type_line: {
    include: { type: [String], default: undefined },
    exclude: { type: [String], default: undefined },
  },

  rarity: {
    include: { type: [String], default: undefined },
    exclude: { type: [String], default: undefined },
  },

  booster_only: { type: Boolean, default: true },

  // e.g. require promo_types includes "sourcematerial"
  promo_types: {
    include_any: { type: [String], default: undefined },  // at least one matches
    include_all: { type: [String], default: undefined },  // must contain all
    exclude_any: { type: [String], default: undefined },  // must contain none
  },

  frame_effects: {
    include_any: { type: [String], default: undefined },  // at least one matches
    include_all: { type: [String], default: undefined },  // must contain all
    exclude_any: { type: [String], default: undefined },  // must contain none
  },

  full_art: { type: Boolean, default: undefined },
});

const slotSourceSchema = new mongoose.Schema({
  source_type: {
    type: String,
    enum: ["main", "child_set"],
    required: true,
  },
  // weight in scale of 100
  weight: { type: Number, required: true, min: 0},

  // only if type = child_set
  child_set_code: { type: String, default: undefined },

  gating: {
    released_at_match_parent: { type: Boolean, default: true },
    // Optional allow/block lists by scryfall_id (better than ObjectId for reseeds)
    allowed_scryfall_ids: { type: [String], default: undefined },
    excluded_scryfall_ids: { type: [String], default: undefined },
  },

  // rarity selection
  rarity: {
    fixed: { type: [String], enum: RARITY, default: undefined }, // eg: ["common"] or ["rare", "mythic"]
    weighted: { type: weightedMapSchema, default: undefined} // eg: common 6%, uncommon 75%...
  },

  // finish selection
  finish: {
    fixed: { type: [String], enum: FINISHES, default: undefined }, // eg: ["nonfoil"] or ["foil", "nonfoil"]
    weighted: { type: weightedMapSchema, default: undefined}
  },

  filters: { type: filtersSchema, default: undefined },

}, { _id: false });

const packSlotSchema = new mongoose.Schema({
  slot_code: { type: String, required: true }, // eg: "common_1_6"
  quantity: { type: Number, required: true, min: 1, default: 1},

  // card pool to get card from
  // eg [{ source_type: "main", weight: 100 }]
  sources: { type: [slotSourceSchema], required: true },

  // dedup logic
  allow_duplicates: { type: Boolean, default: false },

}, { _id: false });

const packRuleSchema = new mongoose.Schema({
  set_code: {
    type: String,
    required: true,
    index: true,
  },

  booster_type: {
    type: String,
    enum: PACK_TYPES,
    required: true,
    index: true,
  },

  total_card_count: {
    type: Number,
    required: true,
    min: 1,
  },

  slots: {
    type: [packSlotSchema],
    required: true,
  },

  is_active: { type: Boolean, default: true },
});

packRuleSchema.index({ set_code: 1, booster_type: 1 }, { unique: true });

const PackRuleModel = mongoose.model("PackRule", packRuleSchema);

module.exports = PackRuleModel;