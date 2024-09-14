const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/healthController');
const { handleBarcodeScan } = require('../controllers/barcodeController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to handle the chat flow with query in the body
router.post('/chat', handleChat);
router.post('/scan', handleBarcodeScan);

module.exports = router;
