import { RequestHandler, ErrorRequestHandler } from "express";
import { sendError } from "../lib/apiResponse";

// Middleware to handle 404 errors
export const notFound: RequestHandler = (req, res, next) => {
  sendError(res, 404, "The requested resource was not found.");
};

// Middleware to handle errors
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  sendError(res, 500, err.message);
};
