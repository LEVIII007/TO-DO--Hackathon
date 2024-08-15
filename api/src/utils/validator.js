// const { body, validationResult } = require("express-validator");
import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  console.log("loginValidator"),
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 characters"),
];

export const signupValidator = [
  console.log("signupValidator"),
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

// const chatCompletionValidator = [
//   body("message").notEmpty().withMessage("Message is required"),
// ];

export const taskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  body("deadline")
    .notEmpty()
    .withMessage("Deadline is required")
    .isLength({ max: 100 })
    .withMessage("Deadline must be a valid date in ISO 8601 format")
];

// module.exports = { validate, loginValidator, signupValidator, taskValidator };