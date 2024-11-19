const Joi = require("joi");

const SET_TYPES = [
  "core",
  "expansion",
  "masters",
  "alchemy",
  "masterpiece",
  "arsenal",
  "from_the_vault",
  "spellbook",
  "premium_deck",
  "duel_deck",
  "draft_innovation",
  "treasure_chest",
  "commander",
  "planechase",
  "archenemy",
  "vanguard",
  "funny",
  "starter",
  "box",
  "promo",
  "token",
  "memorabilia",
  "minigame",
];

const setValidationSchema = {
  create: Joi.object({
    code: Joi.string().required().min(3).max(6),
    name: Joi.string().min(1),
    set_type: Joi.string().valid(...SET_TYPES),
    card_count: Joi.number().integer().min(1),
  }),
  update: Joi.object({
    code: Joi.string().required().min(3).max(6),
    name: Joi.string().min(1),
    set_type: Joi.string().valid(...SET_TYPES),
    card_count: Joi.number().integer().min(1),
  }),
};

module.exports = setValidationSchema;