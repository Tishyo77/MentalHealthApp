const express = require("express");
const Meditate = require("../models/meditateSchema"); 
const meditateRoute = express.Router(); 

meditateRoute.get("/retrieve", async (req, res) => {
  const { name } = req.query; 

  try {
      const meditations = await Meditate.find({ name: name });       
      res.status(200).json(meditations);
  } catch (error) {
      console.error("Error fetching meditations:", error); 
      res.status(500).json({ message: error.message });
  }
});
  

module.exports = meditateRoute;
