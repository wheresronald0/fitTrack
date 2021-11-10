const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User"); //give me access to the objects in the User Schema
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body; //deconstructs the username and email from manually entered in PostMan

  try {
    const user = new User({ email, password }); // passing in the properites I want the new use to have
    await user.save();

    //jwt.io and requireAuth.js
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message); //422 is bad data from user and mongoose will generate ".message"
  }
});

module.exports = router; //need to import where you wnat to use

/*
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MThjMTNhN2MzZGYyMmU3YzFlNjU5YjMiLCJpYXQiOjE2MzY1NzAwMjN9.xxQnBiCW8xgqS1H8FPPqKWal6n9BBJaRlZEe-2ysWJM"
}
*/
