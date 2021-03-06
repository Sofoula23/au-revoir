const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    name: String, 
    activities: [{
      outdoors: String,
      indoor: String,
      ecoFriendly: String,
      water: String,
      cultural: String,
      kidsFriendly: String,
      extreme: String,
      relaxed: String,
      sightseeing: String
    }],
    restaurants: [{
      name: String,
      address: String, 
      address2: String,
      city: String,
      province: String,
      postal: String
    }],
    flights: [{
      flightNumber: String,
      airline: String,
      itinerary: String,
      seats: [{
        type: String
      }]
    }],
    travelers: [{
      name: String,
      profilePicture: String,
      age: Number
    }],
    destination: [{
      continent: [{
        europe: String,
        southAmerica: String,
        northAmerica: String,
        africa: String,
        asia: String,
        australia: String,
        antartica: String 
      }],
      country: String,
      province: String,
      city: String,
    }],
    stay: [{
      hotel: String,
      rental: String,
      hostal: String,
      couchsurf: String,
      length: Number
    }],
    transportation: [{
      type: String,
      price: Number
    }],    
    other: [{
      name: String
    }] 

  });
  const Trip = mongoose.model('Trip', tripSchema);  

module.exports = Trip; 