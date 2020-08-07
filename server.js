const express = require("express");
// const router = require("express").Router();
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const Workout = require("./workoutModel.js");
// const { Db } = require("mongodb");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workoutdb", { useNewUrlParser: true });

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

app.listen(3000, () => {
    console.log("App running on port 3000!");
});

