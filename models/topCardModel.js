const mongoose = require("mongoose");

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
  finish: {
    type: String,
    required: true,
  }
});

// unique compound index to ensure no duplicated document
// cardId - setId - finish combination should be unique
topCardSchema.index({ card_id: 1, set_id: 1, finish: 1}, { unique: true });

const TopCardModel = mongoose.model("Top Card", topCardSchema);

module.exports = TopCardModel;