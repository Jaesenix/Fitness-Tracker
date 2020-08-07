const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://jsuser:dbpassword01@ds161074.mlab.com:61074/heroku_w4v8lwfl", { useNewUrlParser: true });

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
});

