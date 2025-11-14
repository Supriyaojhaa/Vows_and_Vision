import express from "express";
import {
  getDashboard,
  addToWishlist,
  removeFromWishlist
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Get user dashboard
router.get("/dashboard", getDashboard);

// Add to wishlist
router.post("/wishlist/add", addToWishlist);

// Remove from wishlist
router.post("/wishlist/remove", removeFromWishlist);

export default router;
