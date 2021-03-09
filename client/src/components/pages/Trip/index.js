import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useCurrentUser } from "../../../context/UserContext";
import Trip from "../../Trip";

import "./styles.css";

function TripPage() {
  const [currentUser] = useCurrentUser();
  const history = useHistory();
  let { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!currentUser) {
      history.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/trips/${id}`);
        setTrip(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="trip-page-loading-indicator">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="trip-page">
      <Trip trip={trip} />
    </div>
  );
}

export default TripPage;
