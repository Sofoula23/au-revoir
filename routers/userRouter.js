const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// salt rounds to has password
const SALT_ROUNDS = 10;

router.post("/", async function (req, res, next) {
  try {
    // First of all, we must see if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    // If the user exists, fail immediately to avoid creating duplicate accounts
    // I am sending the response body in JSON because it is a standard in the web
    if (existingUser) {
      res.status(400).send({
        message: "User already has an account",
      });
      return next();
    }

    // create a new mongoose User object from the request body
    const newUser = new User(req.body);

    // hash the password because it is not safe to store password in plain text in db
    const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);
    newUser.password = hashedPassword;

    // save the user with the hashed password
    await newUser.save();

    // create object without user password because it is unsafe to do that
    const returnUser = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
    res.status(201).send(returnUser);
    next();
  } catch (e) {
    next(e);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    // Find user by email
    const existingUser = await User.findOne({ email: req.body.email });

    // If user does not exist then fail and send error message
    if (!existingUser) {
      res.status(404).send({
        message: "No account found for this email",
      });
      return next();
    }

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!passwordMatched) {
      res.status(400).send({
        message: "Incorrect email/password combination",
      });
      return next();
    }

    // create object without user password because it is unsafe to do that
    const returnUser = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    };
    res.status(200).send(returnUser);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
