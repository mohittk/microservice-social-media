const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            unique: true
        },
        postContent: {
            type: String
        }
    }
)

module.exports = mongoose.model('Post', postSchema);