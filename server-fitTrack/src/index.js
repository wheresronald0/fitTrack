const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoURI =
  "mongodb+srv://admin:admin1@cluster0.cj9ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to Mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("listening!!");
});
