const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema({
  name: String,
  destination: {
    name: String,
    googlePlaceId: String,
    googlePlaceResult: String,
  },
  stays: [
    {
      name: String,
      stayType: {
        enum: ["hotel", "rental", "hostal", "couchsurf"],
      },
      googlePlaceId: String,
      googlePlaceResult: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  restaurants: [
    {
      googlePlaceId: String,
      googlePlaceResult: String,
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
});
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
