const express = require("express");
const userSchema = require("../models/userSchema");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Unauthorized - Invalid token' });
        }

        req.user = decoded; 
        next();
    });
};


userRoute.get("/retrieve", async (req, res) => {
    try {
      const { email } = req.query;
      const user = await userSchema.findOne({ email: email });
      if (user) {
        res.json({ email: user.email, name: user.name, date: user.date }); // Include the avatar field
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

userRoute.post("/login-user", async (req, res) => 
{
    const { email, password } = req.body;
    const token = "NULL";

    try 
    {
        const user = await userSchema.findOne({ email });
        if (user) 
        {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if(passwordMatch)
            {
                // User is authenticated, generate JWT token
                const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '48h' });
                res.json({ data: "Success", token });
            }
            else
            {
                res.json({data: "Incorrect", token});
            }
        }   
        else
        {
            res.json({data: "No Such User", token});
        }
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
});

userRoute.post("/create-user", async (req, res) => {
    const { email, password, name, date } = req.body;
    const saltRounds = 10;
    
    try 
    {
        // Generate salt and hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new userSchema({ email, password: hashedPassword, name, date });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});

userRoute.post("/update-date", async (req, res) => {
    try {
        const { email, date } = req.body;

        const updatedUser = await userSchema.findOneAndUpdate(
            { email: email },
            { $set: { date: date } },
            { new: true } 
        );

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRoute.delete("/delete-user", async (req, res) => {
    try {
        const { email } = req.body;

        const deletedUser = await userSchema.findOneAndDelete({ email: email });

        if (deletedUser) {
            res.json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = userRoute;
