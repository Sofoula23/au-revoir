import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";

import { useCurrentUser } from "../../../context/UserContext";
import Trip from "../../Trip";
import PlacesAutoComplete from "../../PlacesAutoComplete";

import "./styles.css";

function TripPage() {
  const [currentUser] = useCurrentUser();
  const history = useHistory();
  let { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInputValue, setCityInputValue] = useState("");
  useEffect(() => {
    // if user is not logged in, redirect to login page
    if (!currentUser) {
      history.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`/api/trips/${id}`);
      setTrip(response.data);
    };
    load();
  }, [id]);

  const isNew = id === "new";

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const saveNewTrip = async () => {
    const response = await axios.post("/api/trips", {
      destination: selectedCity,
    });
    history.push(`/trips/${response.data._id}`);
  };

  return (
    <div className="trip-page">
      {isNew && (
        <div className="trip-page-begin-section">
          <div className="trip-city-autocomplete">
            <PlacesAutoComplete
              value={cityInputValue}
              onChange={setCityInputValue}
              types="(cities)"
              placeholder="Enter city"
              onSelect={handleCitySelect}
            />
          </div>
          <div className="trip-begin">
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              disabled={!selectedCity}
              onClick={saveNewTrip}
            >
              Create a New Trip
            </Button>
          </div>
        </div>
      )}
      {Boolean(!isNew && trip) && (
        <div className="trip-page-body">
          <Trip trip={trip} />
        </div>
      )}
    </div>
  );
}

export default TripPage;
