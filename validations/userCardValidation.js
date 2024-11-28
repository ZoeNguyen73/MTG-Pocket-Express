const Joi = require("Joi");

const FINISHES = require("../utils/cardAttributes");

const userCardValidationSchema = {
  create: Joi.object({
    user_id: Joi.string()
    .pattern(/^[a-f\d]{24}$/i) // Matches a MongoDB ObjectId
    .required()
    .messages({
      "string.base": `"user_id" should be a valid string.`,
      "string.pattern.base": `"user_id" must be a valid MongoDB ObjectId.`,
      "any.required": `"user_id" is a required field.`,
    }),
    card_id: Joi.string()
      .pattern(/^[a-f\d]{24}$/i) // Matches a MongoDB ObjectId
      .required()
      .messages({
        "string.base": `"card_id" should be a valid string.`,
        "string.pattern.base": `"card_id" must be a valid MongoDB ObjectId.`,
        "any.required": `"card_id" is a required field.`,
      }),
    finish: Joi.string()
      .required()
      .valid(...FINISHES)
      .messages({
        "string.base": `"finish" should be a valid string.`,
        "any.only": `"finish" must be one of the following values: {{#valids}}.`, // Custom message for invalid values
        "any.required": `"finish" is a required field.`,
      }),
    quantity: Joi.number()
      .integer()
      .min(1)
      .required()
      .messages({
        "number.base": `"quantity" must be a number.`,
        "number.integer": `"quantity" must be an integer.`,
        "number.min": `"quantity" must be at least 1.`,
        "any.required": `"quantity" is a required field.`,
      }),
  }),
  update: Joi.object({
    quantity: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      "number.base": `"quantity" must be a number.`,
      "number.integer": `"quantity" must be an integer.`,
      "number.min": `"quantity" must be at least 1.`,
    }),
  }),
};

module.exports = userCardValidationSchema;