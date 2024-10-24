import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import the User model

const auth = express.Router();

// Signup Route
auth.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // verifying for existing user or username
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User Already Exists" });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res
      .status(400)
      .json({ success: false, message: "Username is Already Taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User Registered Successfully " });
  } catch (e) {
    return res.status(500).json({ success: false, message: e });
  }
});

// Login Route
auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credientials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });

  // Generate a JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "14d",
    }
  );

  return res.json({ success: true, message: "Logged-in Successfully", token });
});

export default auth;
