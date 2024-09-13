const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust path as needed

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Decode the token and extract the username
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by username from the token
        const user = await User.findOne({ username: decoded.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user info to the request object
        req.user = user; 
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
