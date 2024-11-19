const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  scryfall_id: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  scryfall_uri: {
    type: String,
    required: true,
  },
  released_at: {
    type: String,
    required: true,
  },
  set_type: {
    type: String,
    required: true,
  },
  card_count: {
    type: Number,
    required: true,
  },
  digital: {
    type: Boolean,
    required: true,
    default: false,
  },
  nonfoil_only: {
    type: Boolean,
    required: true,
    default: false,
  },
  foil_only: {
    type: Boolean,
    required: true,
    default: false,
  },
  icon_svg_uri: {
    type: String,
  }
});

const SetModel = mongoose.model("Set", setSchema);

module.exports = SetModel;