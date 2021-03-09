const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema({
  name: String,
  destination: mongoose.Schema.Types.Mixed,
  stays: [
    {
      place: mongoose.Schema.Types.Mixed,
      startDate: Date,
      endDate: Date,
    },
  ],
  restaurants: [
    {
      place: mongoose.Schema.Types.Mixed,
      visited: Boolean,
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
