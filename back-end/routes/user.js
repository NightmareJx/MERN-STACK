const express = require('express');


// controllers 

const {loginUser,signeupUser} = require('../controllers/user-controller');
const { model } = require('mongoose');


const router = express.Router();

// login route

router.post('/login', loginUser)

// signup route

router.post('/signup', signeupUser)


module.exports = router ;