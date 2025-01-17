import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Guest login
// export const guestLogin = async (req, res) => {
//   try {
//     // Create a guest user with a dummy password
//     const guestUser = new User({
//       name: "Guest",
//       email: `guest-${Date.now()}@example.com`,
//       password: "guest-password", // Add a dummy password
//       role: "guest",
//     });
//     await guestUser.save();

//     // Generate JWT
//     const token = jwt.sign({ userId: guestUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send the token and user ID in the response
//     res.status(200).json({ token, userId: guestUser._id });
//   } catch (error) {
//     console.error("Error in guest login:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const guestLogin = async (req, res) => {
  try {
    // Create a guest user
    const guestUser = new User({ name: "Guest", email: `guest-${Date.now()}@example.com`, role: "guest" });
    await guestUser.save();
    // Generate JWT
    const token = jwt.sign({ userId: guestUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};