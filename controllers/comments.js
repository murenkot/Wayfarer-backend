const db = require('../models');

const showAllComments = (req, res) => {
  db.Comment.find({})
  .populate('author')
  .populate('post')
  .exec((err, allComments) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: allComments,
    });
  });
};

const addComment = (req, res) => {
  const commentData = {...req.body, author: req.session.currentUser.id}
  db.Comment.create(commentData, (err, createdComment) => {
    if (err) return console.log(err);
    db.Post.findById(createdComment.post, (err, foundPost) => {
      if (err) return console.log(err);
      foundPost.comments.push(createdComment._id);
      foundPost.save((err, savedPost) => {
        if (err) console.log(err);
        res.json({
          status: 200,
          data: savedPost,
        });
      });
    });
  });
};

const deleteAllComments = (req, res) => {
  db.Comment.deleteMany({}, (err, deletedComments) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
    });
  });
};

module.exports = {
  showAllComments,
  addComment,
  deleteAllComments,
}