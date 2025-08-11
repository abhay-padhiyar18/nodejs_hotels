const mongoose = require("mongoose");
require('dotenv').config();

// define the mongodb connection URL

//const mongoURL =  process.env.MONGODB_URL_LOCAL;; //Replace 'mydatabases' with your databases name



const mongoURL = process.env.MONGODB_URL;
//const uri = "mongodb+srv://@cluster0.abcde.mongodb.net/hotels_data?retryWrites=true&w=majority";//



mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connected to mongo db error", err));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongo db server");
});
db.on("error", (err) => {
  console.log("Connected to mongo db error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

module.exports = db;