import { body, query, param } from "express-validator";

// Validation for signup
export const signupValidator = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters."),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must be between 5 and 100 characters."),
  body("phoneNumber")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be a 10-digit number."),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required.")
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
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must be between 5 and 100 characters."),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

// Validation for ativity creation
export const activityValiator = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters."),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters."),
  body("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isDate()
    .withMessage("Date is not valid."),

  body("time")
    .notEmpty()
    .withMessage("Time is required.")
    .matches(/^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
    .withMessage(
      "Time must be in 12-hour format with AM/PM. Example: 02:30 PM"
    ),
  body("location")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Location is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Location must be between 3 and 100 characters."),
];

// Validation for activity search
export const activityQueryValidator = [
  query("q")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage("Search query must be less than 50 characters."),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a positive integer between 1 and 100."),
  query("sortBy")
    .optional()
    .isIn(["title", "date", "time", "createdAt"])
    .withMessage(
      "Sort by must be one of the following: title, date, time, createdAt."
    ),
];

// Validation for activity ID
export const activityIdValidator = [
  param("activityId")
    .notEmpty()
    .withMessage("Activity ID is required.")
    .isMongoId()
    .withMessage("Activity ID is not valid."),
];
