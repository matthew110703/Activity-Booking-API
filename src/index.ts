import "dotenv/config";
import express from "express";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is live and running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
