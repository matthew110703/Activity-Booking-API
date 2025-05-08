import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      match: /^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, // Matches 12-hour format with AM/PM. Example: 02:30 PM
    },
    location: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  { timestamps: true }
);

activitySchema.index({
  title: "text",
  description: "text",
  location: "text",
  date: 1,
}); // Create a text index for searching activities by title, description, and location
// and a date index for sorting by date
activitySchema.index({ createdAt: -1 }); // Create an index for sorting by createdAt in descending order

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;

type Time = `${number}:${number} ${"AM" | "PM"}`; // Matches 12-hour format with AM/PM. Example: 02:30 PM

export type ActivityType = {
  title: string;
  description: string;
  date: Date;
  time: Time;
  location: string;
};

export type ActivityDocument = mongoose.Document & ActivityType;
