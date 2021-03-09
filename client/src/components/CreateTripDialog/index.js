import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import ResponsiveDialog from "../ResponsiveDialog";
import PlacesAutoComplete from "../PlacesAutoComplete";

import "./styles.css";

function CreateTripDialog({ open, onClose, onSave }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInputValue, setCityInputValue] = useState("");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const saveNewTrip = async () => {
    const response = await axios.post("/api/trips", {
      destination: selectedCity,
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
