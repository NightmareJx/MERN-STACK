require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const workout_routes = require('./routes/workout');
const users_routes = require('./routes/user')


// express app
const app = express();

// middleware
app.use(express.json());
app.use((req,res,next)=> {
    console.log(req.path,req.method);
    next();
});

// routes
app.use('/api/workouts',workout_routes);
app.use('/api/user', users_routes);

// connect to mongodb
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Successfuly connected to db')
        // starts listening on port 4000
        app.listen(process.env.PORT, () => {
            console.log('Server Wating For Requests on Port ' , process.env.PORT)
        })
    })
    .catch((err) => {console.log(err)});





