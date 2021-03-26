const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  startDate: Date,
  endDate: Date,
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
  travelers: [
    {
      name: String,
      age: Number,
    },
  ],
});
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
