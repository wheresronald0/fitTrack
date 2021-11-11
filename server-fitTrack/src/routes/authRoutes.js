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

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Must provide and email address and valid password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ error: "Sorry ,email wasn't found" });
  }
  //once email is matched, then password is auth
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.send({ token: token });
  } catch (err) {
    return res.status(401).send({ error: "invalid passowrd or email" });
  }
});

module.exports = router; //need to import where you wnat to use

/*
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MThjMTNhN2MzZGYyMmU3YzFlNjU5YjMiLCJpYXQiOjE2MzY1NzAwMjN9.xxQnBiCW8xgqS1H8FPPqKWal6n9BBJaRlZEe-2ysWJM"
}
*/
