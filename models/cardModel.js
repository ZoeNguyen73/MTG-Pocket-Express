const mongoose = require("mongoose");

const cardFaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_png: {
    type: String,
  },
  image_jpg_normal: {
    type: String,
  },
  image_border_crop: {
    type: String,
  },
  layout: {
    type: String,
  },
});

const cardSchema = new mongoose.Schema({
  set_id: {
    type: mongoose.isObjectIdOrHexString,
    ref: "Set",
    required: true,
  },
  scryfall_id: {
    type: String,
    required: true,
    unique: true,
  },
  lang: {
    type: String,
    required: true,
  },
  scryfall_uri: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    required: true,
    default: "normal",
  },
  card_faces: {
    type: [cardFaceSchema],
    required: true,
  },
  highres_image: {
    type: Boolean,
    required: true,
  },
  border_color: {
    type: String,
    required: true,
  },
  reserved: {
    type: Boolean,
    required: true,
  },
  finishes: {
    type: [String],
    required: true,
  },
  oversized: {
    type: Boolean,
    required: true,
  },
  promo: {
    type: Boolean,
    required: true,
  },
  reprint: {
    type: Boolean,
    required: true,
  },
  digital: {
    type: Boolean,
    required: true,
  },
  full_art: {
    type: Boolean,
    required: true,
  },
  textless: {
    type: Boolean,
    required: true,
  },
  booster: {
    type: Boolean,
    required: true,
  },
  rarity: {
    type: String,
    required: true,
  },
  frame: {
    type: String,
    required: true,
  },
});

const CardModel = mongoose.model("Card", cardSchema);

module.exports = CardModel;