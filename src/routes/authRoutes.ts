import express from "express";
import { signup, login, getCurrentUser } from "../controllers/authController";

// Validation middlewares
import { signupValidator, loginValidator } from "../lib/validators";
// Middleware
import { isAuthenticated } from "../middleware/auth.middleware";

const router = express.Router();

// Routes
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/me", isAuthenticated, getCurrentUser);

export default router;
