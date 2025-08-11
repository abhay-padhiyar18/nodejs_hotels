const mongoose = require("mongoose");

// define the mongodb connection URL

const mongoURL = "mongodb://localhost:27017/hotels"; //Replace 'mydatabases' with your databases name

//set up MongoDB connections
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//GET the derfault connection
//Mongoose maintains a default connection object representing the MongoDB conncetion.

const db = mongoose.connection;

//Define event listner for database connection

db.on("connected", () => {
  console.log("Connected to mongo db server");
});
db.on("error", (err) => {
  console.log("Connected to mongo db error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});


//Export the databases connections

module.exports = db;
