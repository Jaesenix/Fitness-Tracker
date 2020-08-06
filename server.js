const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const workout = require("./workoutModel.js");
const { Db } = require("mongodb");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });


// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + ".public/stats.html"));
});


// API Routes
app.get("/api/workouts"), (req, res) => {
    db.fitness.find({}).sort({ day: -1 }).limit(1)
        .then(dbfitness => {
            res.json(dbfitness);
        })
        .catch(err => {
            res.json(err);
        });
};

app.put("/api/workouts/:id", (req, res) => {
    let urlData = req.params;
    let data = req.body;
    db.fitness.updateOne({ _id: urlData.id }, {
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

app.post("/api/workouts", (req, res) => {
    let data = req.body;
    db.fitness.create({
        day: new Date().setDate(new Date().getDate())
    }).then(dbUpdate => {
        res.json(dbUpdate);
    })
        .catch(err => {
            res.json(err);
        });
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
});

