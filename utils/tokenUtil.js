// utils/tokenUtil.js
const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
