const express = require('express');
const router = express.Router();
const postSchema = require('../models/postSchema');
const analysisUtils = require('../utils/analysisUtils');
const { createClient } = require('redis');

const redisClient = createClient();
redisClient.connect().catch(console.error);

redisClient.on('error', err => console.log('Redis Client Error', err));

//create post route
router.post('/posts', async (req, res) => {
    try {
        const { postContent, postId } = req.body;
        console.log(postId);
        const newPost = new postSchema({ postId, postContent });
        await newPost.save();
        await redisClient.set(postId, postContent);
        res.status(201).json({ message: "Post creation successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" })
    }
})

//post analysis route
router.get('/posts/:id/analysis', async (req, res) => {
    try {
        const postId = req.params.id;
        // console.log(postId, '####');
        const cachedPostContent = await redisClient.get(postId);
        if (cachedPostContent) {
            const words = cachedPostContent.split(/\s+/).filter(word => word.length > 0);
            const { wordCount, avgWordLength } = analysisUtils.calculateAverageWordLength(words);
            res.status(200).json({ wordCount, avgWordLength });
        }
        else {
            const post = await postSchema.findOne({ postId: postId });

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const words = post.postContent.split(/\s+/).filter(word => word.length > 0);
            const { wordCount, avgWordLength } = analysisUtils.calculateAverageWordLength(words);
            await redisClient.set(postId, post.postContent);
            res.status(200).json({ wordCount, avgWordLength });
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });

    }
})

module.exports = router;

//fault tplenac ecap