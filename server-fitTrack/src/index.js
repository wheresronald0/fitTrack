require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(bodyParser.json()); //install above so it can parse before the route is executed
app.use(authRoutes); //allows you to use all rountes in authRoutes handler

const mongoURI =
  "mongodb+srv://admin:admin1@cluster0.cj9ui.mongodb.net/fitTrack?retryWrites=true&w=majority";
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to Mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  //after get request, requireAuth middleware is run, and moves to .next()
  res.send(`Your email is ${req.user.email} `);
});

app.listen(3000, () => {
  console.log("listening!!");
});
