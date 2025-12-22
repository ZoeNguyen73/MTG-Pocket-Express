const mongoose = require("mongooses");

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
    type: String, // special_guest, bonus_sheet, the_list
    required: true,
    default: "special_guest",
  },
  rules: {
    released_at_match_parent: {
      type: Boolean,
      default: true,
    },
    allowed_card_Ids: {
      type: [{ type: mongoose.ObjectId, ref: "card", required: true }],
      default: [],
    },
    excluded_card_Ids: {
      type: [{ type: mongoose.ObjectId, ref: "card", required: true }],
      default: [],
    },
    is_active: {
      type: Boolean,
      default: true,
    }
  }
});

setRelationshipSchema.index({ parent_set_code: 1, child_set_code: 1, relationship_type: 1 }), { unique: true };

const SetRelationshipModel = mongoose.model("SetRelationship", setRelationshipSchema);

module.exports = SetRelationshipModel;