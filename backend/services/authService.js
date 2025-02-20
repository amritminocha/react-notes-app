const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({msg:"User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await user.save();
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({jwt: token, msg: "User created successfully"});

    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({msg:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, msg: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}