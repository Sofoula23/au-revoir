import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useCurrentUser } from "../../../context/UserContext";
import getPlaceImageUrl from "../../../utils/getPlaceImageUrl";
import CreateTripDialog from "../../CreateTripDialog";
import noTripsImage from "../../../images/no-trips.svg";
import defaultTripImage from "../../../images/default-trip.svg";

import "./styles.css";

function TripsPage() {
  const history = useHistory();
  const [currentUser] = useCurrentUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!currentUser) {
      history.push("/login");
    }
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users/${currentUser._id}/trips`);
        setTrips(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const openCreateTripDialog = () => {
    setCreateDialogIsOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogIsOpen(false);
  };

  const handleTripSave = (trip) => {
    history.push(`/trips/${trip._id}`);
    handleCreateDialogClose();
  };

  if (isLoading) {
    return (
      <div className="trips-loading-indicator">
        <CircularProgress />
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div className="no-trips">
        <Typography variant="h5" className="no-trips-title">
          No Trips Found
        </Typography>
        <img src={noTripsImage} className="no-trips-image" />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={openCreateTripDialog}
        >
          Create a Trip
        </Button>
        <CreateTripDialog
          open={createDialogIsOpen}
          onClose={handleCreateDialogClose}
          onSave={handleTripSave}
        />
      </div>
    );
  }

  return (
    <div className="trips-page">
      <Grid container spacing={2}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card className="trip-card">
              <Link to={`/trips/${trip._id}`} className="trip-link">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={trip.destination.formatted_address}
                    height="140"
                    image={getPlaceImageUrl(trip.destination, defaultTripImage)}
                    title={trip.destination.formatted_address}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {trip.destination.formatted_address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        className="create-new-trip-fab"
        onClick={openCreateTripDialog}
      >
        <AddIcon />
      </Fab>
      <CreateTripDialog
        open={createDialogIsOpen}
        onClose={handleCreateDialogClose}
        onSave={handleTripSave}
      />
    </div>
  );
}

export default TripsPage;
