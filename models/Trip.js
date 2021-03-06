const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema({
  name: String,
  flights: [
    {
      flightNumber: String,
      airline: String,
      itinerary: String,
      seats: [
        {
          type: String,
        },
      ],
    },
  ],
  travelers: [
    {
      name: String,
      profilePicture: String,
      age: Number,
    },
  ],
  destinations: [
    {
      continent: {
        type: String,
        enum: [
          "europe",
          "southAmerica",
          "northAmerica",
          "africa",
          "asia",
          "australia",
          "antartica",
        ],
      },

      country: String,
      province: String,
      city: String,
      completed: Boolean,
      stays: [
        {
          stayType: {
            enum: ["hotel", "rental", "hostal", "couchsurf"],
          },
          startDate: Date,
          endDate: Date,
        },
      ],
      restaurants: [
        {
          name: String,
          address: String,
          address2: String,
          city: String,
          province: String,
          postal: String,
          completed: Boolean,
        },
      ],
      activities: [
        {
          description: String,
          completed: Boolean,
          activityType: {
            type: String,
            enum: [
              "outdoors",
              "indoor",
              "ecoFriendly",
              "water",
              "cultural",
              "kidsFriendly",
              "extreme",
              "relaxed",
              "sightseeing",
            ],
          },
        },
      ],
    },
  ],
});
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
