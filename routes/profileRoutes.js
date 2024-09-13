const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/:username', profileController.getProfile);


router.put('/update', authMiddleware, profileController.updateProfile);
router.post('/edite', authMiddleware, profileController.editProfile);

router.post('/test', authMiddleware, (req, res) => {
    console.log('Profile edit route reached');
    res.status(200).json({ message: 'Route working' });
});
module.exports = router;
