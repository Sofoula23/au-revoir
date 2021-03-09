import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
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

import getPlaceImageUrl from "../../utils/getPlaceImageUrl";
import {
  ManageRestaurantsDialog,
  ManageRestaurantsList,
} from "./ManageRestaurants";

import { ManageStaysDialog, ManageStaysList } from "./ManageStays";

import defaultRestaurantImage from "../../images/default-restaurant.svg";
import defaultStayImage from "../../images/default-stay.svg";
import "./styles.css";

function Trip({ trip }) {
  const [currentTrip, setCurrentTrip] = useState(trip);
  const [tripToSave, setTripToSave] = useState(null);
  const [speedDialIsOpen, setSpeedDialIsOpen] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [restaurantModalIsOpen, setRestaurantModalIsOpen] = useState(null);
  const [selectedStays, setSelectedStays] = useState([]);
  const [stayModalIsOpen, setStayModalIsOpen] = useState(null);

  useEffect(() => {
    setCurrentTrip(trip);
  }, [trip]);

  useEffect(() => {
    if (!tripToSave) {
      return;
    }
    const updateTrip = async () => {
      const response = await axios.put(
        `/api/trips/${tripToSave._id}`,
        tripToSave
      );
      setCurrentTrip(response.data);
    };
    updateTrip();
  }, [tripToSave]);

  const handleSpeedDialOpen = () => {
    setSpeedDialIsOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialIsOpen(false);
  };

  const saveTrip = (trip) => {
    setCurrentTrip(trip);
    setTripToSave(trip);
  };

  const openRestaurantsModal = () => {
    setSelectedRestaurants(currentTrip.restaurants);
    setRestaurantModalIsOpen(true);
  };

  const handleRestaurantModalClose = () => {
    setRestaurantModalIsOpen(false);
  };

  const saveRestaurant = () => {
    handleRestaurantModalClose();
    saveTrip({
      ...currentTrip,
      restaurants: selectedRestaurants,
    });
  };

  const handleRestaurantsChange = (restaurants) => {
    setSelectedRestaurants(restaurants);
  };

  const removeRestaurant = (restaurant) => {
    const newRestaurants = currentTrip.restaurants.filter(
      (r) => r !== restaurant
    );
    saveTrip({ ...currentTrip, restaurants: newRestaurants });
  };

  const updateRestaurantVisitedStatus = (restaurant, visited) => {
    const newRestaurants = currentTrip.restaurants.map((r) => {
      if (r !== restaurant) {
        return r;
      }
      return { ...r, visited };
    });
    saveTrip({ ...currentTrip, restaurants: newRestaurants });
  };

  const openStaysModal = () => {
    setSelectedStays(currentTrip.stays);
    setStayModalIsOpen(true);
  };

  const handleStayModalClose = () => {
    setStayModalIsOpen(false);
  };

  const saveStay = () => {
    handleStayModalClose();
    saveTrip({
      ...currentTrip,
      stays: selectedStays,
    });
  };

  const handleStaysChange = (stays) => {
    setSelectedStays(stays);
  };

  const removeStay = (stay) => {
    const newStays = currentTrip.stays.filter((r) => r !== stay);
    saveTrip({ ...currentTrip, stays: newStays });
  };

  const tripIsEmpty =
    !currentTrip.stays.length &&
    !currentTrip.restaurants.length &&
    !currentTrip.activities.length &&
    !currentTrip.flights.length &&
    !currentTrip.travelers.length;

  const actions = [
    { icon: <FaceIcon />, name: "Traveler" },
    { icon: <AirplanemodeActiveIcon />, name: "Flight" },
    {
      icon: <HotelIcon />,
      name: "Stay",
      onClick: () => {
        openStaysModal();
        handleSpeedDialClose();
      },
    },
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

  const locationCoordinates = `${currentTrip.destination.geometry.location.lat},${currentTrip.destination.geometry.location.lng}`;

  return (
    <div className="trip">
      <div className="trip-header">
        <Hidden smDown>
          <Typography variant="h2" component="h1">
            {currentTrip.destination.formatted_address}
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography variant="h5" component="h1">
            {currentTrip.destination.formatted_address}
          </Typography>
        </Hidden>
      </div>
      {tripIsEmpty && (
        <div className="trip-begin-instructions">
          Your trip is empty, click on the + sign on the bottom right to begin.
        </div>
      )}
      <div className="trip-cards">
        <Grid container spacing={2}>
          <Grid item sm={6} md={4}>
            {Boolean(currentTrip.restaurants.length) && (
              <div className="trip-restaurants">
                <Card>
                  <CardMedia
                    component="img"
                    alt="Trip Restaurants"
                    height="140"
                    image={getPlaceImageUrl(
                      trip.restaurants[0].place,
                      defaultRestaurantImage
                    )}
                    title="Trip Restaurants"
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
          <Grid item sm={6} md={4}>
            {Boolean(currentTrip.stays.length) && (
              <div className="trip-stays">
                <Card>
                  <CardMedia
                    component="img"
                    alt="Trip Stays"
                    height="140"
                    image={getPlaceImageUrl(
                      trip.stays[0].place,
                      defaultStayImage
                    )}
                    title="Trip Stays"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Stays
                    </Typography>
                    <ManageStaysList
                      stays={currentTrip.stays}
                      onRemove={removeStay}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={openStaysModal}
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
      <ManageStaysDialog
        open={stayModalIsOpen}
        stays={selectedStays}
        onClose={handleStayModalClose}
        onChange={handleStaysChange}
        location={locationCoordinates}
        saveButton={
          <Button color="inherit" onClick={saveStay}>
            Save
          </Button>
        }
      />
    </div>
  );
}

export default Trip;
