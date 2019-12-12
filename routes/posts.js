const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/posts


//GET All Posts
router.get('/all', ctrl.posts.showAll);

// router.get('/:id', ctrl.posts.show);
router.get('/findById/:id', ctrl.posts.show);


// ADD POST
router.post('/new', ctrl.posts.addPost);

// UPDATE POST
router.put('/:id', ctrl.posts.updatePost);


// Find post 
router.get('/find', ctrl.posts.findPosts);

// DELETE POST
router.delete('/:id', ctrl.posts.deletePost);

module.exports = router;
