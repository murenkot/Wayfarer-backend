const db = require('../models');

// DELETE nuke all posts
const deleteAllPosts = (req, res) => {
    db.Post.deleteMany({}, (err, deletedPosts) => {
        if (err) return console.log(err);
            res.json({
            status: 200,
            data: deletedPosts
        });
    });
};

// GET all posts
const showAll = (req, res) => {
    db.Post.find({})
    .populate('author')
    .populate('city')
    .exec((err, allPosts) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allPosts
        });
    });
};

// GET one post
const show = (req, res) => {
    db.Post.findById(req.params.id)
    .populate('author')
    .populate('city')
    .exec((err, foundPost) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: foundPost
        });
    });
};


const addPost = (req, res) => {
    const postData = {...req.body, author: req.session.currentUser.id};
    db.Post.create(postData, (error, createdPost)=>{
        if (error) return console.log(error);
        db.User.findById(createdPost.author, (err, foundUser) => {
            if (err) return console.log(err);
            foundUser.posts.push(createdPost._id);
            foundUser.save((err, updatedUser) => {
                if (err) return console.log(err);
                res.json({
                    status: 201,
                    data: updatedUser,
                });
            });
        });
    });
};

const findPosts = (req, res) => {
    db.City.find(req.query, (error, foundCity)=> {
        if (error) return console.log(error);
        city_id = foundCity[0]._id;
        db.Post.find({city: city_id._id}).populate('author').exec((error, foundPosts)=> {
            if (error) return console.log(error);
            res.json({
                status: 201,
                data: foundPosts,
            })
        }); 
    })
};

// Update one post
const updatePost = (req, res) => {
    db.Post.findById(req.params.id, (err, foundPost) => {
        if (err) return console.log(err);
        if (req.body.city) {
            foundPost.city = req.body.city;
        };
        if (req.body.title) {
            foundPost.title = req.body.title;
        };
        if (req.body.content) {
            foundPost.content = req.body.content;
        };
        if (req.body.photo) {
            foundPost.photo = req.body.photo;
        };

        foundPost.save((err, updatedPost)=> {
            if (err) console.log(err);
        });

        res.json({
            status: 201,
            data: foundPost,
        });
    });
};


// delete one post
const deletePost = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
        if (error) return console.log(error);
        res.json({
            status: 200,
            data: deletedPost
        });
    });
}


module.exports = {
    showAll,
    show,
    addPost,
    findPosts,
    updatePost,
    deleteAllPosts,
    deletePost,
};