import { body } from "express-validator";

// Validation for signup
export const signupValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters."),
  body("email")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must be between 5 and 100 characters."),
  body("phoneNumber")
    .isString()
    .withMessage("Phone number must be a string.")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be a 10-digit number."),
  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be strong and at least 8 characters long. It should contain at least one uppercase letter, one lowercase letter, one number, and one symbol."
    ),
];

// Validation for login
export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must be between 5 and 100 characters."),
  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];
