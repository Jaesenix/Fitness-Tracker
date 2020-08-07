const express = require("express");
const app = express();
const Workout = require("../workoutModel.js");

// API Routes
app.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    const data = req.body;
    if (data.type === "cardio") {
        Workout.updateOne({ _id: req.params.id }, {
            $push: {
                exercises: [{
                    type: data.type,
                    name: data.name,
                    duration: data.duration,
                    distance: data.distance
                }]
            }
        }).then(dbUpdate => {
            res.json(dbUpdate);
        })
            .catch(err => {
                res.json(err);
            })
    } else {
        Workout.updateOne({ _id: req.params.id }, {
            $push: {
                exercises: [{
                    type: data.type,
                    name: data.name,
                    duration: data.duration,
                    weight: data.weight,
                    reps: data.reps,
                    sets: data.sets
                }]
            }
        }).then(dbUpdate => {
            res.json(dbUpdate);
        })
            .catch(err => {
                console.log(err)
            });
    }
});

app.post("/api/workouts", (req, res) => {
    let data = req.body;
    Workout.create({
        day: new Date().setDate(new Date().getDate())
    }).then(dbUpdate => {
        res.json(dbUpdate);
    })
        .catch(err => {
            res.json(err);
        });
});

module.exports = app;

