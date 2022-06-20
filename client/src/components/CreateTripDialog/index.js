import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import { useCurrentUser } from "../../context/UserContext";
import ResponsiveDialog from "../ResponsiveDialog";
import PlacesAutoComplete from "../PlacesAutoComplete";
import { DateTime } from "luxon";

import "./styles.css";

function CreateTripDialog({ open, onClose, onSave }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInputValue, setCityInputValue] = useState("");
  const now = DateTime.now();
  const [startDate, setStartDate] = useState(now.toISODate());
  const [endDate, setEndDate] = useState('');
  const [currentUser] = useCurrentUser();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const saveNewTrip = async () => {
    const response = await axios.post("/api/trips", {
      destination: selectedCity,
      user: currentUser._id,
    });
    onSave(response.data);
  };

  return (
    <ResponsiveDialog
      title="Create a New Trip"
      open={open}
      onClose={onClose}
      saveButton={
        <Button color="inherit" onClick={saveNewTrip}>
          Save
        </Button>
      }
    >
      <div className="create-trip-dialog-body">
        <div className="trip-city-autocomplete">
          <PlacesAutoComplete
            value={cityInputValue}
            onChange={setCityInputValue}
            types="(cities)"
            placeholder="Enter city"
            onSelect={handleCitySelect}
          />
        </div>
        <div className="add-date">

          <div className="date-section">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDate}
              min={now.toISODate()}
              size= "medium"
            ></input>
          </div>

          <div className="to-section">
            to
          </div>

          <div className="date-section">
            <input
            type="date"
            value={endDate}
            onChange={handleEndDate}
            ></input>
          </div>

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
    </ResponsiveDialog>
  );
}

export default CreateTripDialog;
