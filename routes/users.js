const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

// GET all users
router.get('/all', ctrl.users.showAllUsers);

//GET Profile by ID
router.get('/findById/:id', ctrl.users.show);

//PUT Update Profile
router.put('/:id/update', ctrl.users.update);

module.exports = router;