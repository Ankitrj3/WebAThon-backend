// controllers/postController.js
const Post = require('../models/postModel');
const Profile = require('../models/profileModel');
const mongoose = require('mongoose');
// Create a new post
exports.createPost = async (req, res) => {
    try {
        
        const username = req.user.username; 

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: username, 
        });


        
        const savedPost = await newPost.save();
        await Profile.findOneAndUpdate(
            { username: req.user.username },
            { $push: { posts: savedPost._id } }
        );


        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fetch all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a reply to a post
exports.addReply = async (req, res) => {
    try {
        const postId = req.params.id;
        const username = req.user.username;
        const replyContent = req.body.content;

        
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const reply = {
            _id: new mongoose.Types.ObjectId(),
            content: replyContent,
            author: username,
            createdAt: new Date(),
        };
        post.replies.push(reply);

        await post.save();
        await Profile.findOneAndUpdate(
            { username: req.user.username },
            { $push: { replies: reply._id.toString() } } 
        );

        res.status(200).json({ message: 'Reply added', post });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: error.message });
    }
};


// Fetch all replies for a post
exports.getReplies = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('replies.author', 'username');
        if (!post) return res.status(404).json({ error: "Post not found" });

        res.status(200).json(post.replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
