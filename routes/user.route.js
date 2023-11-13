const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

router.route("/addUser").post(async (req, res) => {
  try {
    const { username, email, password, key, pfp } = req.body;

    const newUser = new User({
      username,
      email,
      password,
      key,
      pfp,
    });

    await newUser.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while signing up",
      details: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Sign-in successful", user });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while signing in",
      details: error.message,
    });
  }
});

router.route("/updateUsername").put(async (req, res) => {
  const { key, newUsername } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { key: key },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: "Error updating username" });
  }
});

router.get("/getUserPfp", async (req, res) => {
  try {
    const { key } = req.query;

    const user = await User.findOne({ key });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ pfp: user.pfp });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the user's pfp",
      details: error.message,
    });
  }
});

router.put("/updateUserPfp", async (req, res) => {
  const { key, newPfp } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { key: key },
      { pfp: newPfp },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: "Error updating user pfp" });
  }
});

router.get("/getUsername", async (req, res) => {
  try {
    const { key } = req.query;

    const user = await User.findOne({ key });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the user's pfp",
      details: error.message,
    });
  }
});

router.get("/getUserData", async (req, res) => {
  try {
    const { key } = req.query;

    const user = await User.findOne({ key });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { username, pfp } = user;

    res.json({ username, pfp });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching user data",
      details: error.message,
    });
  }
});


module.exports = router;
