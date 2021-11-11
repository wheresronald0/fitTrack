const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id }); //my req has already authenticated the user and has the user id prop
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "Please provide a name and location" });
  }

  //defining obj to send to Mongo based on my perviously defined Track schema
  try {
    const track = new Track({
      name: name,
      locations: locations,
      userId: req.user._id,
    });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
