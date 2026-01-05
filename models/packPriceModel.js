const mongoose = require("mongoose");

const { PACK_TYPES } = require("../utils/boosterTypes");

const packPriceSchema = new mongoose.Schema({
  set_code: {
    type: String,
    require: true,
    index: true,
  },
  booster_type: {
    type: String,
    enum: PACK_TYPES,
    require: true,
    index: true,
  },
  price: {
    type: Number,
    require: true,
    default: null
  }
});

packPriceSchema.index({ set_code: 1, booster_type: 1 }, { unique: true });

const PackPriceModel = mongoose.model("PackPrice", packPriceSchema);

module.exports = PackPriceModel;