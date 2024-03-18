const workoutModule = require('../modules/workout-module');
const mongoose = require('mongoose');

// get all workouts
const getworkouts = async (req,res) => {
    //
    const user_id = req.user._id ;

    const workouts = await workoutModule.find({ user_id }).sort( {createdAt : -1});

    res.status(200).json(workouts);
}

// get a single workout
const getworkout = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout' })
    }

    const workout = await workoutModule.findById(id)

    if (!workout) {
        return res.status(404).json({error : 'no such workout'})
    }

    res.status(200).json(workout);
}

// create new workout

const createWorkout = async (req,res) => {
    const { title , reps , load } = req.body

    let emptyFields = []

    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  

    try {
        // taking the id from req body taken from the token info
        const user_id = req.user._id ;
        const workout = await workoutModule.create({title, reps , load , user_id});
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error : err.message})
    }
}

// delete a workout

const deleteWorkout = async (req,res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : 'No such workout'})
    }

    const workout = await workoutModule.findByIdAndDelete({_id : id});

    if (!workout) {
        return res.status(400).json({error : 'No such Workout'})
    }
    else {
        res.status(200).json(workout)
    }

}

// update a workout
const updateWorkout = async (req,res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : 'No such workout'})
    }

    const workout = await workoutModule.findOneAndUpdate({_id : id} , {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: 'No such Workout'})
    }
    res.status(200).json(workout);
}






// export controllers

module.exports = {
    createWorkout,
    getworkout,
    getworkouts,
    deleteWorkout,
    updateWorkout,
}