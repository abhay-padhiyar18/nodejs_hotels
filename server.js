const express = require("express");
const mongoose = require("mongoose"); // assuming db.js connects mongoose
const MenuItem = require("./models/MenuItem");

const app = express();

// ✅ Middleware - must come before routes
app.use(express.json()); // Parses incoming JSON requests

// ✅ DB connection (assuming db.js has your connection logic)
require("./db");

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
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
