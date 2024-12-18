const Joi = require("joi");

import layoutCardFaceMapping from "../utils/cardLayoutsMapping";
import { LANGUAGES, BORDER_COLORS, RARITY, FINISHES } from "../utils/cardAttributes";
const CARD_LAYOUTS = Object.keys(layoutCardFaceMapping);

const cardValidationSchema = {
  create: Joi.object({
    set_id: Joi.string().required().length(24),
    scryfall_id: Joi.string().required().min(1),
    lang: Joi.string().required().valid(...LANGUAGES),
    scryfall_id: Joi.string().required().min(1),
    layout: Joi.string().required().valid(...CARD_LAYOUTS),
    card_faces: Joi.array().items(
      Joi.object({
        name: Joi.string().required().min(1),
        image_small: Joi.string().required().min(1).uri(),
        image_png: Joi.string().required().min(1).uri(),
        image_jpg_normal: Joi.string().required().min(1).uri(),
        image_border_crop: Joi.string().required().min(1).uri(),
        layout: Joi.string(),
        type_line: Joi.string().required(),
      })
    ),
    highres_image: Joi.boolean().required(),
    border_color: Joi.string().required().valid(...BORDER_COLORS),
    reserved: Joi.boolean().required(),
    finishes: Joi.string().required().valid(...FINISHES),
    oversized: Joi.boolean().required(),
    promo: Joi.boolean().required(),
    reprint: Joi.boolean().required(),
    digital: Joi.boolean().required(),
    full_art: Joi.boolean().required(),
    textless: Joi.boolean().required(),
    booster: Joi.boolean().required(),
    rarity: Joi.string().required().valid(...RARITY),
    frame: Joi.string().required(),
  }),
  update: Joi.object({
    set_id: Joi.string().required().min(1).length(24),
    scryfall_id: Joi.string().required().min(1),
    lang: Joi.string().required().valid(...LANGUAGES),
    scryfall_id: Joi.string().required().min(1),
    layout: Joi.string().required().valid(...CARD_LAYOUTS),
    card_faces: Joi.array().items(
      Joi.object({
        name: Joi.string().required().min(1),
        image_small: Joi.string().required().min(1).uri(),
        image_png: Joi.string().required().min(1).uri(),
        image_jpg_normal: Joi.string().required().min(1).uri(),
        image_border_crop: Joi.string().required().min(1).uri(),
        layout: Joi.string(),
        type_line: Joi.string().required(),
      })
    ),
    highres_image: Joi.boolean().required(),
    border_color: Joi.string().required().valid(...BORDER_COLORS),
    reserved: Joi.boolean().required(),
    finishes: Joi.string().required().valid(...FINISHES),
    oversized: Joi.boolean().required(),
    promo: Joi.boolean().required(),
    reprint: Joi.boolean().required(),
    digital: Joi.boolean().required(),
    full_art: Joi.boolean().required(),
    textless: Joi.boolean().required(),
    booster: Joi.boolean().required(),
    rarity: Joi.string().required().valid(...RARITY),
    frame: Joi.string().required(),
  }),
};

module.exports = cardValidationSchema; 