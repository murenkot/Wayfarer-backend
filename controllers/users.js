const db = require('../models');

// GET all users
const showAllUsers = (req, res) => {
    db.User.find({})
    .populate('posts')
    .exec((err, allUsers) => {
        if (err) {
            return console.log(err)
        };
        res.json({
            status: 200,
            count: allUsers.length,
            data: allUsers,
        });
    });
};

// DELETE nuke all users
const deleteAllUsers = (req, res) => {
    db.User.deleteMany({}, (err, deletedUsers) => {
        if (err) return console.log(err);
            res.json({
            status: 200,
        });
    });
};

// GET show one user
const show = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.User.findById(req.session.currentUser.id)
    .populate('posts')
    .exec((err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });

        res.status(200).json({
            status: 200,
            data: foundUser
        });
    });
};

// UPDATE one user
const update = (req, res) => {

    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.User.findById(req.session.currentUser.id, (err, foundUser)=>{
        if (err) {console.log(err); return};
        if (req.body.username) {
            foundUser.username = req.body.username;
        };
        if (req.body.email) {
            foundUser.email = req.body.email;
        };
        if (req.body.currentCity) {
            foundUser.currentCity = req.body.currentCity
        }
        if (req.body.photo) {
            foundUser.photo = req.body.photo;
        }

        foundUser.save((err, updatedUser)=> {
            if (err) console.log(err);
        });

        res.json({
            status: 201,
            data: foundUser,
        })
    })
};


module.exports = {
    show,
    update,
    showAllUsers,
    deleteAllUsers
};