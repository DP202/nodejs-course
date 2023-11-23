const Joi = require("./joi");
const passwordSchema = Joi.string().min(6).required();
const emailSchema = Joi.string().email().required();

const registerSchema = Joi.object({
  // Đăng kí tài khoản : username , email , password
  username: Joi.string().min(3).required(),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = { registerSchema, loginSchema, passwordSchema, emailSchema };
