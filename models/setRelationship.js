const mongoose = require("mongoose");

const setRelationshipSchema = new mongoose.Schema({
  parent_set_code: {
    type: String,
    required: true,
    index: true,
  },
  child_set_code: {
    type: String,
    required: true,
    index: true,
  },
  relationship_type: {
    type: String,
    enum: ["special_guest", "bonus_sheet", "the_list", "other"],
    required: true,
    default: "special_guest",
  },
  rules: {
    released_at_match_parent: {
      type: Boolean,
      default: true,
    },
    allowed_card_scryfall_ids: {
      type: [{ type: String }],
      default: [],
    },
    excluded_card_scryfall_ids: {
      type: [{ type: String }],
      default: [],
    },
  },
  is_active: {
    type: Boolean,
    default: true,
  }
});

setRelationshipSchema.index({ parent_set_code: 1, child_set_code: 1, relationship_type: 1 }, { unique: true }) ;

const SetRelationshipModel = mongoose.model("Set Relationship", setRelationshipSchema);

module.exports = SetRelationshipModel;