import { Router } from "express";
const UserRouter = Router()
import bcrypt from "bcrypt";
import AuthGuard from "../token.js";
import User from "../models/User.js"

// @route GET api/users
// @description Get all users
// @access Public
UserRouter.get("/", AuthGuard, (req, res) => {
  //res.status(400).send("Test");
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nocryptosfound: "No user found" }));
});

// @route PUT api/users/:id
// @description Modify an user
// @access Public
UserRouter.put("/:id", AuthGuard, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: "user modified successfully" }))
    .catch((err) => res.status(404).json({ nouserfound: "No user found" }));
});

// @route PUT api/users/:id
// @description Modify a password of an user
// @access Public
UserRouter.put("/changepass/:id", AuthGuard,  (req, res) => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!re.test(req.body.password)) {
      return res.status(400).send({
        message: "Minimum eight characters, at least one letter and one numbers",
      });
    }
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((user) => res.json({ msg: "password modified successfully" }))
      .catch((err) => res.status(404).json({ nouserfound: "No user found" }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
UserRouter.get("/:id", AuthGuard, (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nouserfound: "No user found" }));
});

// @route POST api/users/register
// @description add a new user
// @access Public
UserRouter.post("/register", (req, res) => {
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!re.test(req.body.password)) {
    return res.status(400).send({
      message: "Minimum eight characters, at least one letter and one numbers",
    });
  }
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  User.create(req.body)
    .then((user) => res.json({ msg: "user added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this user " + err })
    );
});

// @route POST api/users/login
// @description return 200 if password ok 400 if not
// @access Public
UserRouter.post("/login", async (request, response) => {
  var user = await User.findOne({ email: request.body.email }).exec();
  console.log(user)
  if (!user) {
    return response
      .status(200)
      .send({ message: "The username does not exist" });
  }

  if (!bcrypt.compareSync(request.body.password, user.password)) {
    return response.status(200).send({ message: "The password is invalid" });
  }
  response.send({
    message: "The username and password combination is correct!",
  });
});

// @route DELETE api/users/:id
// @description Delete users by id
// @access Public
UserRouter.delete("/:id", AuthGuard, (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "user entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a user" }));
});

UserRouter.post("/logout", AuthGuard, (req, res) => {  
  res.status(200).send("Logout");
});

export default UserRouter
