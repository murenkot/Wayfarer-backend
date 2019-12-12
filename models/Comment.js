const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: [true, 'Comment content is required'],
    },
    commentDate: {
        type: Date,
        default: Date.now,
    },
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;