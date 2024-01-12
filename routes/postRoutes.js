const express = require('express');
const router = express.Router();
const postSchema = require('../models/postSchema');
const analysisUtils = require('../utils/analysisUtils');

//create post route
router.post('/posts', async(req, res) => {
    try {
        const {postContent, postId} = req.body;
        console.log(postId);
        const newPost = new postSchema({postId, postContent});
        await newPost.save();
        res.status(201).json({message: "Post creation successful"});

    } catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"})
    }
})

//post analysis route
router.get('/posts/:id/analysis', async(req, res) => {
    try {
        const postId = req.params.id;
        // console.log(postId, '####');
        const post = await postSchema.findOne({postId: postId});

        if(!post){
            return res.status(404).json({error: 'Post not found'});
        }

        const words = post.postContent.split(/\s+/).filter(word => word.length > 0);
        const {wordCount, avgWordLength} = analysisUtils.calculateAverageWordLength(words);
        res.status(200).json({ wordCount,avgWordLength });
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server error"});
        
    }
})

module.exports = router;

//fault tplenac ecap