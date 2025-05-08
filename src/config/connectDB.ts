import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    if (process.env.NODE_ENV === "development")
      console.log("MongoDB connected");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();
// export default connectDB;
