const express = require("express");
const Therapist = require("../models/therapistSchema"); // Adjusted variable name
const router = express.Router(); // Adjusted variable name

// Get all therapists
router.get("/details", async (req, res) => {
  try {
    const therapists = await Therapist.find({ approved: true }); // Adjusted query to fetch only approved therapists
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new therapist
router.post("/add-therapist", async (req, res) => {
  try {
    await Therapist.create(req.body);
    // Respond with a success message
    res.status(201).json({ message: 'Therapist added successfully' });
  } catch (error) {
    // If an error occurs, respond with a 400 status code and the error message
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

