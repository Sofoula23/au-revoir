const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// this route is for getting all trips
router.get("/", async function (req, res, next) {
  try {
    const trips = await Trip.find();
    res.status(200).send(trips);
    next();
  } catch (e) {
    next(e);
  }
});

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
