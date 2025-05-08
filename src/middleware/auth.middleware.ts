import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { Types } from "mongoose";
import { sendError } from "../lib/apiResponse";

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return sendError(res, 401, "No token provided.");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: Types.ObjectId;
    };
    // Attach userId to request object
    req.userId = decoded.userId;
    // Call next middleware or route handler
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return sendError(res, 401, "Invalid token.");
    } else if (e instanceof jwt.TokenExpiredError) {
      return sendError(res, 401, "Token expired.");
    }

    return sendError(res, 401, "Invalid token.");
  }
};
