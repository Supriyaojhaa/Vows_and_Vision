import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  amount: Number,
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
