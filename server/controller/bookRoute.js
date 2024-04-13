const express = require("express");
const bookSchema = require("../models/bookSchema");
const bookRoute = express.Router();

bookRoute.get("/retrieve", async (req, res) => {
    try {
        const books = await bookSchema.find(); 
        res.status(200).json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = bookRoute;