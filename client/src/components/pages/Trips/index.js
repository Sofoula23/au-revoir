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
import noTripsImage from "../../../images/undraw_void_3ggu.svg";

import "./styles.css";

function TripsPage() {
  const history = useHistory();
  const [currentUser] = useCurrentUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!currentUser) {
      history.push("/login");
    }
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/trips");
        setTrips(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

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
        <Link to="/trips/new">
          <Button type="button" variant="contained" color="primary">
            Create a Trip
          </Button>
        </Link>
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
                    image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${trip.destination.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
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
      <Link to="/trips/new" className="create-new-trip-fab">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}

export default TripsPage;
