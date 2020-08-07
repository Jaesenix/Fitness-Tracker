const router = require("express").Router();
const Workout = require("../workoutModel.js");

// API Routes
router.get("/api/workouts", (req, res) => {
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

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    let urlData = req.params;
    let data = req.body;
    Workout.updateOne({ _id: urlData.id }, {
        $push: {
            exercises: [{
                "type": data.type,
                "name": data.name,
                "duration": data.duration,
                "distance": data.distance,
                "weight": data.weight,
                "reps": data.reps,
                "sets": data.sets
            }]
        }
    }).then(dbUpdate => {
        res.json(dbUpdate);
    })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
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

module.exports = router;

