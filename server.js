const express = require("express");
const mongoose = require("mongoose"); // assuming db.js connects mongoose
const MenuItem = require("./models/MenuItem");

require('dotenv').config();
const app = express();

// ✅ Middleware - must come before routes
app.use(express.json()); // Parses incoming JSON requests

// ✅ DB connection (assuming db.js has your connection logic)
require("./db");

const PORT = process.env.PORT || 3000;
// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome To Our Hotel.");
});

//Import the router files

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);


//Start server
app.listen(PORT, () => {
  console.log("Server is running on 3000");
});
