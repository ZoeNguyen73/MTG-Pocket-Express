const mongoose = require("mongoose");

const userCardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  card_id: {
    type: mongoose.ObjectId,
    ref: "Card",
    required: true,
  },
  finish: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  is_favourite: {
    type: Boolean,
    required: true,
    default: false,
  },
  latest_add_time: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

// unique compound index to ensure no duplicated document
// userId - cardId - finish combination should be unique
userCardSchema.index({ user_id: 1, card_id: 1, finish: 1}, { unique: true });

const UserCardModel = mongoose.model("User Card", userCardSchema);

module.exports = UserCardModel;