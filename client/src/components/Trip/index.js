import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import {
  ManageRestaurantsDialog,
  ManageRestaurantsList,
} from "./ManageRestaurants";

import cevicheImage from "../../images/ceviche.jpg";
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
  const [speedDialIsOpen, setSpeedDialIsOpen] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [restaurantModalIsOpen, setRestaurantModalIsOpen] = useState(null);

  useEffect(() => {
    setCurrentTrip(trip || newTrip);
  }, [trip]);

  const isNew = !currentTrip._id;

  const openRestaurantsModal = () => {
    setSelectedRestaurants(currentTrip.restaurants);
    setRestaurantModalIsOpen(true);
  };

  const handleSpeedDialOpen = () => {
    setSpeedDialIsOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialIsOpen(false);
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

  const removeRestaurant = (restaurant) => {
    const newRestaurants = currentTrip.restaurants.filter(
      (r) => r !== restaurant
    );
    setCurrentTrip({ ...currentTrip, restaurants: newRestaurants });
  };

  const updateRestaurantVisitedStatus = (restaurant, visited) => {
    const newRestaurants = currentTrip.restaurants.map((r) => {
      if (r !== restaurant) {
        return r;
      }
      return { ...r, visited };
    });
    setCurrentTrip({ ...currentTrip, restaurants: newRestaurants });
  };

  const trimIsEmpty =
    !currentTrip.stays.length &&
    !currentTrip.restaurants.length &&
    !currentTrip.activities.length &&
    !currentTrip.flights.length &&
    !currentTrip.travelers.length;

  const actions = [
    { icon: <FaceIcon />, name: "Traveler" },
    { icon: <AirplanemodeActiveIcon />, name: "Flight" },
    { icon: <HotelIcon />, name: "Stay" },
    { icon: <NaturePeopleIcon />, name: "Activity" },
    {
      icon: <RestaurantIcon />,
      name: "Restaurant",
      onClick: () => {
        openRestaurantsModal();
        handleSpeedDialClose();
      },
    },
  ];

  const locationCoordinates = `${currentTrip.city.geometry.location.lat},${currentTrip.city.geometry.location.lng}`;

  return (
    <div className="trip">
      <div className="trip-header">
        <Typography variant="h1" component="h2">
          Berlin, Germany
        </Typography>
      </div>
      {trimIsEmpty && (
        <div className="trip-begin-instructions">
          Your trip is empty, click on the + sign on the bottom right to begin.
        </div>
      )}
      <div className="trip-cards">
        <Grid container>
          <Grid item sm={6} md={4}>
            {Boolean(currentTrip.restaurants.length) && (
              <div className="trip-restaurants">
                <Card>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={cevicheImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Restaurants
                    </Typography>
                    <ManageRestaurantsList
                      restaurants={currentTrip.restaurants}
                      onRemove={removeRestaurant}
                      onVisitedChange={updateRestaurantVisitedStatus}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={openRestaurantsModal}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      <div className="trip-speed-dial-container">
        <Backdrop open={speedDialIsOpen} />
        <SpeedDial
          ariaLabel="Trip actions"
          className="trip-speed-dial"
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onClick={handleSpeedDialOpen}
          open={speedDialIsOpen}
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

      <ManageRestaurantsDialog
        open={restaurantModalIsOpen}
        restaurants={selectedRestaurants}
        onClose={handleRestaurantModalClose}
        onChange={handleRestaurantsChange}
        location={locationCoordinates}
        saveButton={
          <Button color="inherit" onClick={saveRestaurant}>
            Save
          </Button>
        }
      />
    </div>
  );
}

export default Trip;
