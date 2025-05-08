import express from "express";
import {
  createBooking,
  getUserBookings,
} from "../controllers/bookingController";

// Validation
import { activityIdValidator } from "../lib/validators";

// Middleware
import { isAuthenticated } from "../middleware/auth.middleware";

const router = express.Router();

// Routes

router.post(
  "/:activityId",
  isAuthenticated,
  activityIdValidator,
  createBooking
);
router.get("/", isAuthenticated, getUserBookings);

export default router;
