const Joi = require("joi");

const SET_TYPES = require("../utils/setTypes");

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