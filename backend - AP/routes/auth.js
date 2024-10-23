import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import the User model

const auth = express.Router();

// Signup Route
auth.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ success: false, message: "User Already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Registered Successfully " });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
});

// Login Route
auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, message: "Invalid Credientials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  // Generate a JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ success: true, message: "Logged-in Successfully", token });
});

export default auth;
