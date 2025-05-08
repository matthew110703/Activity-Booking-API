import { RequestHandler } from "express";
import { sendSuccess, sendError } from "../lib/apiResponse";
import { validationResult, matchedData } from "express-validator";

// Models & Types
import User, { UserDocument } from "../models/user.model";
import Booking, { BookingDocument } from "../models/booking.model";
import Activity, { ActivityDocument } from "../models/activity.model";
import { Types } from "mongoose";

// Create a booking
export const createBooking: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, "Validation Error", errors.array());
  }

  try {
    const { activityId } = matchedData(req) as { activityId: Types.ObjectId };

    // Check if the user exists
    const user: UserDocument = await User.findById(req.userId).select(
      "-password"
    );
    if (!user) {
      return sendError(res, 404, "User not found!");
    }

    // Check if the activity exists
    const activity: ActivityDocument | null = await Activity.findById(
      activityId
    );
    if (!activity) {
      return sendError(res, 404, "Activity not found!");
    }

    // Check if the activity is already booked by the user
    const existingBooking: BookingDocument | null = await Booking.findOne({
      user: req.userId,
      activity: activityId,
    });
    if (existingBooking) {
      return sendError(res, 400, "You have already booked this activity!");
    }

    // Create a new booking
    const newBooking = await Booking.create({
      user: req.userId,
      activity: activityId,
    });

    if (!newBooking) {
      return sendError(res, 500, "Failed to create booking. Please try again.");
    }

    // Populate the booking with user and activity details
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user", "-password -__v -updatedAt")
      .populate("activity", "-__v -updatedAt")
      .select("-__v -updatedAt");

    // Send success response
    sendSuccess(res, 201, "Activity successfully booked!", populatedBooking);
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again.");
  }
};

// Get all bookings for a user
export const getUserBookings: RequestHandler = async (req, res) => {
  try {
    // Check if the user exists
    const user: UserDocument = await User.findById(req.userId).select(
      "-password -__v -updatedAt"
    );
    if (!user) {
      return sendError(res, 404, "User not found!");
    }

    // Get all bookings for the user
    const bookings = await Booking.find({ user: req.userId })
      .populate("user", "-password -__v -updatedAt")
      .populate("activity", "-__v -updatedAt")
      .select("-__v -updatedAt");

    if (!bookings || bookings.length === 0) {
      return sendError(res, 404, "No bookings found for this user!");
    }

    // Send success response
    sendSuccess(res, 200, "Bookings retrieved successfully!", {
      totalBookings: bookings.length,
      bookings,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again.");
  }
};
