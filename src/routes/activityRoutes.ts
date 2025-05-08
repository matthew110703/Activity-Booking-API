import express from "express";
import {
  createActivity,
  getActivities,
} from "../controllers/activityController";

// Validation
import { activityValiator } from "../lib/validators";

// Middleware
import { isAuthenticated } from "../middleware/auth.middleware";

const router = express.Router();

// Routes
router
  .route("/")
  .get(getActivities) // Get all activities
  .post(isAuthenticated, activityValiator, createActivity); // Create a new activity

export default router;
