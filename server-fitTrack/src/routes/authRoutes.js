const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User"); //give me access to the objects in the User Schema

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body; //deconstructs the username and email from manually entered in PostMan

  const user = new User({ email, password }); // passing in the properites I want the new use to have
  await user.save();

  res.send("Request made");
});

module.exports = router; //need to import where you wnat to use

/*
const { email, password } = req.body; //deconstructs the username and email from manually entered in PostMan

const user = new User({ email, password }); // passing in the properites I want the new use to have
await user.save();

res.send("Request made");

*/
