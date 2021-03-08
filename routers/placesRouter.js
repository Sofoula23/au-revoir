const express = require("express");
const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");

const router = express.Router();
// create Google maps client according to the docs
const client = new Client({});

// use environment variables to not have to commit keys to source code
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
// the timeout has to be an int so I have to parse it as an int from the environment
const GOOGLE_MAPS_API_TIMEOUT = parseInt(process.env.GOOGLE_MAPS_API_TIMEOUT);

// route that powers the autocomplete searchbox for trip places
router.get("/autocomplete", async function (req, res, next) {
  try {
    // use the places api to find suggestions based on the user input
    const params = {
      input: req.query.input,
      key: GOOGLE_MAPS_API_KEY,
    };

    if (req.query.location) {
      params.location = req.query.location;
      params.radius = req.query.radius;
    }

    if (req.query.types) {
      params.types = req.query.types;
    }

    if (req.query.strictbounds !== undefined) {
      params.strictbounds = req.query.strictbounds;
    }

    const response = await client.placeAutocomplete(
      {
        params,
        timeout: GOOGLE_MAPS_API_TIMEOUT,
      },
      axios
    );
    res.status(200).send(response.data.predictions);
    next();
  } catch (e) {
    next(e);
  }
});

// route that returns full details about a certain place
// this is used for when the users selects the place suggestion in the autocomplete
router.get("/details/:placeId", async function (req, res, next) {
  try {
    const response = await client.placeDetails(
      {
        params: {
          place_id: req.params.placeId,
          key: GOOGLE_MAPS_API_KEY,
        },
        timeout: GOOGLE_MAPS_API_TIMEOUT,
      },
      axios
    );
    res.status(200).send(response.data.result);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
