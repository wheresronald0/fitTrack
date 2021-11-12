const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers; //header set up in Postman
  //authorization will be "Bearer 'jksahflakjhfakghhgahgf'"

  if (!authorization) {
    return res
      .status(401)
      .send({ error: "You must be logged in to access info!" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "secret_key", async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "You must be logged in to access info!" });
    }

    const { userId } = payload;
    const user = await User.findById(userId); //tells mongoose to look at the db collection
    req.user = user;
    next();
  });
};
