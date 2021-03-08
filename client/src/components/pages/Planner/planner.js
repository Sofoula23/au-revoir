import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useCurrentUser } from "../../../context/UserContext";
import Trip from "../../Trip";
import noTripsImage from "../../../images/undraw_void_3ggu.svg";

import "./planner.css";

function Planner() {
  const history = useHistory();
  const [currentUser] = useCurrentUser();
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!currentUser) {
      history.push("/login");
    }
    const load = async () => {
      const response = await axios.get("/api/trips");
      setTrips(response.data);
    };
    load();
  }, []);
  if (false && !trips.length) {
    return (
      <div className="no-trips">
        <Typography variant="h5" className="no-trips-title">
          No Trips Found
        </Typography>
        <img src={noTripsImage} className="no-trips-image" />
        <Button type="button" variant="contained" color="primary">
          Create a Trip
        </Button>
      </div>
    );
  }
  return (
    <div className="planner-page">
      <Trip />
    </div>
  );
}

export default Planner;
