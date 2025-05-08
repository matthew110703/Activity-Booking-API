import { RequestHandler } from "express";
import { sendSuccess, sendError } from "../lib/apiResponse";
import { validationResult, matchedData } from "express-validator";
import Activity from "../models/activity.model";

// Types
import { ActivityType, ActivityDocument } from "../models/activity.model";
type OptionsType = {
  page: number;
  limit: number;
  skip: number;
  sort?: { [key: string]: number };
};

// Get list of Activities
export const getActivities: RequestHandler = async (req, res) => {
  // Validate query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed!", errors.array());
  }

  try {
    // Fetch query parameters
    const { page = 1, limit = 10 } = matchedData(req, {
      includeOptionals: true,
    });

    const skip = (page - 1) * limit;
    const query: { [key: string]: object } = {};
    const options: OptionsType = {
      page: Number(page),
      limit: Number(limit),
      skip: Number(skip),
    };

    // Check if search query is provided
    if (req.query.q) {
      const searchQuery = req.query.q as string;
      query["$or"] = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Check if sortBy is provided
    if (req.query.sortBy) {
      const sortOptions =
        typeof req.query.sortBy === "string" ? req.query.sortBy.split(":") : [];
      const field = sortOptions[0];
      const order = sortOptions[1] === "desc" ? -1 : 1;
      options["sort"] = { [field]: order };
    } else {
      options["sort"] = { createdAt: -1 }; // Default sorting by createdAt in descending order
    }

    // Fetch activities with pagination and search
    const activities: Array<ActivityDocument> = await Activity.find(
      query,
      "-__v",
      options
    );
    const count = await Activity.countDocuments(query);

    // Check if activities are found
    if (activities.length === 0) {
      return sendError(res, 404, "No activities found!");
    }

    // Check if the page number is valid
    if (page > Math.ceil(count / limit)) {
      return sendError(res, 404, "Page not found!");
    }

    return sendSuccess(res, 200, "Activities retrieved Successfully.", {
      totalItems: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
      limit: Number(limit),
      items: activities,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again later.");
  }
};

// Create a new activity
export const createActivity: RequestHandler = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed!", errors.array());
  }
  try {
    const { title, description, date, time, location } =
      matchedData<ActivityType>(req);

    // Check if activity already exists
    const existingActivity = await Activity.findOne({ title });
    if (existingActivity) {
      return sendError(res, 409, "Activity already exists!");
    }

    // Create new activity
    const newActivity = await Activity.create({
      title,
      description,
      date,
      time,
      location,
    });

    return sendSuccess(res, 201, "Activity created successfully!", newActivity);
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.error(e);
    return sendError(res, 500, "Something went wrong! Please try again later.");
  }
};
