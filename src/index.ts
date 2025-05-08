import "dotenv/config"; // Load environment variables from .env file
import "./config/connectDB"; // Database connection
import express from "express";
import morgan from "morgan";

const app = express();

// Middlewares
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
