const mongoose = require("mongoose");

const { PACK_TYPES } = require("../utils/boosterTypes");

const topCardSchema = new mongoose.Schema({
  card_id: {
    type: mongoose.ObjectId,
    ref: "Card",
    required: true,
  },
  set_id: {
    type: mongoose.ObjectId,
    ref: "Set",
    required: true,
  },
  pack_type: {
    type: String,
    enum: PACK_TYPES,
    required: true,
  },
  finish: {
    type: String,
    required: true,
  }
});

// unique compound index to ensure no duplicated document
// cardId - setId - finish combination should be unique
topCardSchema.index({ card_id: 1, set_id: 1, pack_type: 1, finish: 1}, { unique: true });

const TopCardModel = mongoose.model("TopCard", topCardSchema);

module.exports = TopCardModel;