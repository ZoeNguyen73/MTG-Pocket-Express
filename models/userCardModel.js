const mongoose = require("mongoose");

const userCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  cardId: {
    type: mongoose.ObjectId,
    ref: "Card",
    required: true,
  },
  finish: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

// unique compound index to ensure no duplicated document
// userId - cardId - finish combination should be unique
userCardSchema.index({ userId: 1, cardId: 1, finish: 1}, { unique: true });

const UserCardModel = mongoose.model("User Card", userCardSchema);

module.exports = UserCardModel;