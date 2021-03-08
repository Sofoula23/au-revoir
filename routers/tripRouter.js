const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// define the home page route
router.get("/", async function (req, res, next) {
  try {
    const trips = await Trip.find();
    res.status(200).send(trips);
    next();
  } catch (e) {
    next(e);
  }
});
// define the about route
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

module.exports = router;
