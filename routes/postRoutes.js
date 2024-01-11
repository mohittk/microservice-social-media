const express = require('express');
const router = express.Router();
const postSchema = require('../models/postSchema');
const { v4: uuidv4 } = require('uuid')

router.post('/posts', async(req, res) => {
    try {
        const {postContent} = req.body;
        const postId = uuidv4();
        console.log(postId);
        const newPost = new postSchema({postId, postContent});
        await newPost.save();
        res.status(201).json({message: "Post creation successful"});

    } catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"})
    }
})

router.get('/posts/:id/analysis', async(req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId, '####');
        const post = await postSchema.findOne({postId: postId});

        if(!post){
            return res.status(404).json({error: 'Post not found'});
        }

        const words = post.postContent.split(/\s+/).filter(word => word.length > 0);
        let wordCount = 0;
        let totalWordLength = 0;

        for(const word of words){
            wordCount++;
            totalWordLength+=word.length;
        }

        const avgWordLength = wordCount > 0 ? totalWordLength/wordCount : 0;
        res.status(200).json({ wordCount,avgWordLength });
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server error"});
        
    }
})

module.exports = router;