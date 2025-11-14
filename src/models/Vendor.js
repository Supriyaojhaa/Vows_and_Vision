import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  category: String,
  priceRange: String,
  photos: [String],
  availability: [{ date: Date, slots: [String] }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);
