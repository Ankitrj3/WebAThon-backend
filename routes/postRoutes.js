const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.post('/', authMiddleware, postController.createPost);

router.put('/:id', authMiddleware, postController.updatePost);

router.delete('/:id', authMiddleware, postController.deletePost);

router.post('/:id/replies', authMiddleware, postController.addReply);


router.get('/:id/replies', postController.getReplies);

router.get('/test', (req, res) => {
    res.status(200).send('Test route working');
});

module.exports = router;
