import User from "../models/User.js";
import Vendor from "../models/vendor.js";
import Booking from "../models/Booking.js";


// Get User Dashboard

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist", "businessName category priceRange photos")
      .populate({
        path: "bookings",
        populate: { path: "vendorId", select: "businessName category" }
      });

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ dashboard: user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Add Vendor to Wishlist

export const addToWishlist = async (req, res) => {
  try {
    const { vendorId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.wishlist.includes(vendorId)) {
      return res.status(400).json({ msg: "Vendor already in wishlist" });
    }

    user.wishlist.push(vendorId);
    await user.save();

    res.json({ msg: "Vendor added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Remove Vendor from Wishlist

export const removeFromWishlist = async (req, res) => {
  try {
    const { vendorId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter(id => id.toString() !== vendorId);
    await user.save();

    res.json({ msg: "Vendor removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
