var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Schema = require("mongoose").Schema;
const userSchema = Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "users",
  }
);

let User;
try {
  User = mongoose.model("users");
} catch (err) {
  User = mongoose.model("users", userSchema);
}

const makeHash = async (paintext) => {
  const result = await bcrypt.hash(paintext, 10);
  return result;
};

const insertUser = (dataUser) => {
  return new Promise((resolve, reject) => {
    var new_user = new User({
      username: dataUser.username,
      password: dataUser.password,
    });
    new_user.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert user to DB!"));
      } else {
        resolve({ message: "Sign up successfully" });
      }
    });
  });
};
router.route("/signup").post((req, res) => {
  makeHash(req.body.password).then((hashText) => {
    const playload = {
      username: req.body.username,
      password: hashText,
    };
    console.log(playload);
    insertUser(playload)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;