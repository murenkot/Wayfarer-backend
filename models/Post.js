const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'city is required']
},
  title: {
    type: String,
    required: [true, 'title is required']
  },
  photo: {
    type: String,
    required: [true, 'photo is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    require: [true, 'Post content is required'],
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }],
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
