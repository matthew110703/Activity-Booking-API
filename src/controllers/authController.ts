import { RequestHandler } from "express";
import { sendSuccess, sendError } from "../lib/apiResponse";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model";

// Types
import { UserType, UserDocument } from "../models/user.model";
import { validationResult, matchedData } from "express-validator";
import { Types } from "mongoose";

// Generate JWT token
const generateToken = (userId: Types.ObjectId) => {
  return jsonwebtoken.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// Signup a new user
export const signup: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation error", errors.array());
  }

  try {
    const { name, email, phoneNumber, password } = matchedData<UserType>(req);

    // Check if user already exists
    const existingUser: UserDocument | null = await User.findOne({ email });
    if (existingUser) {
      return sendError(
        res,
        409,
        "User already exists with this email address."
      );
    }

    // Hasing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: UserDocument = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Send response
    return sendSuccess(res, 201, "SignUp Successfull.", {
      user: {
        _id: newUser._id as Types.ObjectId,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (e) {
    return sendError(res, 500, "Something went wrong! Please try again later.");
  }
};

// Login a user
export const login: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation error", errors.array());
  }

  try {
    const { email, password } = matchedData<UserType>(req);

    // Check if user exists
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) {
      return sendError(res, 401, "Invalid credentials. Please try again.");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid credentials. Please try again.");
    }

    // Generate JWT token
    const token = generateToken(user._id as Types.ObjectId);

    // Send response
    return sendSuccess(res, 200, "Login successful.", {
      type: "Bearer",
      token,
      expiresIn: "1d",
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again later.");
  }
};

// Get Authenticated user
export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    // Get userId from request object (set by isAuthenticated middleware)
    const userId = req.userId;

    // Find user by ID
    const user: UserDocument | null = await User.findById(userId).select(
      "-password -__v"
    );

    if (!user) {
      return sendError(res, 404, "User not found.");
    }

    // Send response
    return sendSuccess(res, 200, "User retrieved successfully.", {
      user,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again later.");
  }
};
