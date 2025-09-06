import Joi from "joi";

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;

const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .alphanum()
    .required()
    .messages({
      "string.base": "Username should be a type of text",
      "string.alphanum": "Username must only contain letters and numbers",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 30 characters",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // allow all TLDs like .com, .io, .in etc
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  fullname: Joi.string().min(3).max(50).required().messages({
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name cannot exceed 50 characters",
    "any.required": "Full name is required",
  }),

  // Now accepts string or array
  address: Joi.alternatives().try(
    Joi.string().min(5),
    Joi.array().items(Joi.string().min(5))
  ).required().messages({
    "string.min": "Address must be at least 5 characters",
    "array.includes": "Each address must be at least 5 characters",
    "any.required": "Address is required",
  }),

  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must be at least 6 characters long, contain 1 uppercase, 1 number, and 1 special character",
    "any.required": "Password is required",
  }),

  profileImage: Joi.string().uri().optional().messages({
    "string.uri": "Profile image must be a valid URL",
  }),
});

export { registerValidation };

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { loginValidation };
