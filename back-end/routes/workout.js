const express = require('express');
const router = express.Router();
const {
    createWorkout ,
    getworkout,
    getworkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workouts-controller')
const requireAuth = require('../middleware/requireAuth');

//require Authorisation (token) for all users 
router.use(requireAuth)

// GET all workout

router.get('/' , getworkouts);

// GET a single workout

router.get('/:id' , getworkout)

// POST a Workout

router.post('/' , createWorkout) ;

// DELETE a workout

router.delete('/:id' , deleteWorkout)

// UPDATE a workout 

router.patch('/:id' , updateWorkout)







module.exports = router ;