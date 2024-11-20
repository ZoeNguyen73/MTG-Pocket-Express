const Joi = require("joi");

const userValidationSchema = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
    confirm_password: Joi.ref('hash'),
  }),
  login: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
  }),
  update: Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    avatar: Joi.string().alphanum(),
  }),
};

module.exports = userValidationSchema;