import "dotenv/config"; // Load environment variables from .env file
import "./config/connectDB"; // Database connection
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet()); // Security headers
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/v1", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is live and running!",
  });
});
app.use("/api/v1/auth", require("./routes/authRoutes").default);
app.use("/api/v1/activities", require("./routes/activityRoutes").default);
app.use("/api/v1/bookings", require("./routes/bookingRoutes").default);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development")
    console.log(`Server is running on http://localhost:${PORT}`);
});
