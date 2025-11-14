import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    weddingDate: {
      type: Date
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor" // reference to Vendor model
      }
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking" // reference to Booking model
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
