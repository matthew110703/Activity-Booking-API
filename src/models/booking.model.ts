import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

export type BookingType = {
  user: mongoose.Schema.Types.ObjectId;
  activity: mongoose.Schema.Types.ObjectId;
};
export type BookingDocument = mongoose.Document & BookingType;
