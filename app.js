const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const agentRoutes = require('./routes/agentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/agent', agentRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
