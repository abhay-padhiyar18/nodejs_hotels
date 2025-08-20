const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth"); // Import the passport configuration
//const mongoose = require("mongoose"); // assuming db.js connects mongoose
//const MenuItem = require("./models/MenuItem");


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Middleware Function

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};
app.use(logRequest); // Use the middleware function


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome To Our Hotel.");
});

//Import the router files

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//Use the routers
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);

//Start server
app.listen(PORT, () => {
  console.log("Server is running on 3000");
});

