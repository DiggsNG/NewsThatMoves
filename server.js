//Required Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Mongoose leverages Javascript ES6 promises
mongoose.Promise = Promise;

// Initialize Express
let app = express();
let port = process.env.Port || 8808;

// Require all models
// const db = require("./models");



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/news_eventsdb", { useNewUrlParser: true });
var db = mongoose.connection;

// Display any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Success message generated based on logon success.
  db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//Routes
//=================
let routes = require("./controllers/routes.js");
app.use("/",routes);


app.listen(port, function() {
    console.log("APP running on " + port);
  });