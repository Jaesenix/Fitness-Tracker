const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type."
        },
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name."
        },
        duration: {
            type: Number,
            required: "How long was the exercise in minutes?"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
});

const workout = mongoose.model("workout", workoutSchema);

mongoose.model.exports = workout;