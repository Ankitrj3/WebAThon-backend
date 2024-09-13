const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Profile = require('../models/profileModel');
// Signup a new user (storing password in plain text)
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password,  
        });

        const newProfile = await Profile.create({
            username: user.username, 
            name: username,             
            bio: '',                    
            interests: [],               
            posts: [],                   
            replies: []                 
        });

        
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            user: user,
            profile: newProfile,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user (check plain text password)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch current user's profile (requires auth)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
