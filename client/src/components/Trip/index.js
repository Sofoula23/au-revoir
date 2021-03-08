import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import FaceIcon from "@material-ui/icons/Face";
import HotelIcon from "@material-ui/icons/Hotel";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";

import PlacesAutoComplete from "../PlacesAutoComplete";
import ManageRestaurantsDialog from "./dialogs/ManageRestaurants";

import "./styles.css";

const newTrip = {
  stays: [],
  restaurants: [],
  activities: [],
  flights: [],
  travelers: [],
};

function Trip({ trip }) {
  const [currentTrip, setCurrentTrip] = useState(newTrip);
  const [cityInputValue, setCityInputValue] = useState("");
  const [speedDialIsOpen, setSpeedDialIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [restaurantModalIsOpen, setRestaurantModalIsOpen] = useState(null);

  useEffect(() => {
    setCurrentTrip(trip || newTrip);
  }, [trip]);

  const isNew = !currentTrip._id;
  const actions = [
    { icon: <FaceIcon />, name: "Traveler" },
    { icon: <AirplanemodeActiveIcon />, name: "Flight" },
    { icon: <HotelIcon />, name: "Stay" },
    { icon: <NaturePeopleIcon />, name: "Activity" },
    {
      icon: <RestaurantIcon />,
      name: "Restaurant",
      onClick: () => {
        setSelectedRestaurants(currentTrip.restaurants);
        handleSpeedDialClose();
        setRestaurantModalIsOpen(true);
      },
    },
  ];

  const handleSpeedDialOpen = () => {
    setSpeedDialIsOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialIsOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const saveRestaurant = () => {
    handleRestaurantModalClose();
    if (isNew) {
      setCurrentTrip({
        ...currentTrip,
        restaurants: selectedRestaurants,
      });
    } else {
      // call API to save new restaurant
      // setTrip(tripFromAPI)
    }
  };

  const handleRestaurantsChange = (restaurants) => {
    setSelectedRestaurants(restaurants);
  };

  const handleRestaurantModalClose = () => {
    setRestaurantModalIsOpen(false);
  };

  const trimIsEmpty =
    !currentTrip.stays.length &&
    !currentTrip.restaurants.length &&
    !currentTrip.activities.length &&
    !currentTrip.flights.length &&
    !currentTrip.travelers.length;

  return (
    <div className="trip">
      {/* <div className="trip-header">
        <Typography variant="h1" component="h2">
          Berlin, Germany
        </Typography>
      </div> */}
      <div className="trip-city-autocomplete">
        <PlacesAutoComplete
          value={cityInputValue}
          onChange={setCityInputValue}
          types="(cities)"
          placeholder="Enter city"
          onSelect={handleCitySelect}
        />
      </div>
      {Boolean(selectedCity) && trimIsEmpty && (
        <div className="trip-begin-instructions">
          Your trip is empty, click on the + sign on the bottom right to begin.
        </div>
      )}

      <div className="trip-speed-dial-container">
        <Backdrop open={speedDialIsOpen} />
        <SpeedDial
          ariaLabel="Trip actions"
          className="trip-speed-dial"
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onClick={handleSpeedDialOpen}
          open={speedDialIsOpen}
          hidden={!Boolean(selectedCity)}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </div>

      {Boolean(selectedCity) && (
        <ManageRestaurantsDialog
          open={restaurantModalIsOpen}
          restaurants={selectedRestaurants}
          onClose={handleRestaurantModalClose}
          onChange={handleRestaurantsChange}
          location={`${selectedCity.geometry.location.lat},${selectedCity.geometry.location.lng}`}
          saveButton={
            <Button color="inherit" onClick={saveRestaurant}>
              Save
            </Button>
          }
        />
      )}
    </div>
  );
}

export default Trip;
