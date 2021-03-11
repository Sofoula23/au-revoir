const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const User = require("../models/User");

// this route is for getting a trip by id
router.get("/:id", async function (req, res, next) {
  try {
    const trip = await Trip.findById(req.params.id);
    res.status(200).send(trip);
    next();
  } catch (e) {
    next(e);
  }
});

// this route is for saving a trip
router.post("/", async function (req, res, next) {
  try {
    if (!req.body.user) {
      res.status(400).send({
        message: "A valid user ID was not provided",
      });
      return next();
    }

    const user = await User.findById(req.body.user);
    if (!user) {
      res.status(400).send({
        message: "The user ID provided is invalid",
      });
      return next();
    }

    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).send(newTrip);
    next();
  } catch (e) {
    next(e);
  }
});

// this route is for saving a trip
router.put("/:id", async function (req, res, next) {
  try {
    const savedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(savedTrip);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
