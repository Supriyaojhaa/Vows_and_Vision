import User from "../models/User.js";
import Vendor from "../models/vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER USER / VENDOR

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // role: "user" or "vendor"

    // Check if email already exists in User or Vendor
    const exist = await User.findOne({ email }) || await Vendor.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    let newAccount;
    if (role === "vendor") {
      newAccount = await Vendor.create({
        businessName: name,
        ownerName: name,
        email,
        password: hashed
      });
    } else {
      newAccount = await User.create({
        name,
        email,
        password: hashed
      });
    }

    const token = generateToken(newAccount._id);

    // Safe response without password
    const safeAccount = {
      _id: newAccount._id,
      name: newAccount.name || newAccount.businessName,
      email: newAccount.email,
      createdAt: newAccount.createdAt,
      role: role || "user"
    };

    res.status(201).json({ msg: "Registration successful", token, user: safeAccount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN USER / VENDOR

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check in User and Vendor
    const account = await User.findOne({ email }) || await Vendor.findOne({ email });
    if (!account) return res.status(404).json({ msg: "User not found" });

    // Compare password
    const match = await bcrypt.compare(password, account.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(account._id);

    const safeAccount = {
      _id: account._id,
      name: account.name || account.businessName,
      email: account.email,
      role: account instanceof Vendor ? "vendor" : "user"
    };

    res.json({ msg: "Login successful", token, user: safeAccount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
