const Joi = require("joi");

const { FINISHES } = require("../utils/cardAttributes");

const userCardValidationSchema = {
  update: Joi.object({
    user_id: Joi.string()
    .length(24)
    .required()
    .messages({
      "string.base": `"user_id" should be a valid string.`,
      "any.required": `"user_id" is a required field.`,
    }),
    card_id: Joi.string()
      .length(24)
      .required()
      .messages({
        "string.base": `"card_id" should be a valid string.`,
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
      .optional()
      .messages({
        "number.base": `"quantity" must be a number.`,
        "number.integer": `"quantity" must be an integer.`,
      }),
    is_favourite: Joi.boolean(),
  }),
};

module.exports = userCardValidationSchema;