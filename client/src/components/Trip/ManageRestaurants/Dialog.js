import React, { useState } from "react";

import ResponsiveDialog from "../../ResponsiveDialog";
import PlacesAutoComplete from "../../PlacesAutoComplete";
import ManageRestaurantsList from "./List";

import "./styles.css";

function ManageRestaurantsDialog({
  open,
  onClose,
  saveButton,
  location,
  restaurants,
  onChange,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleRestaurantSelection = (restaurant) => {
    onChange([...restaurants, restaurant]);
    setInputValue("");
  };

  const removeRestaurant = (restaurant) => {
    const newRestaurants = restaurants.filter((r) => r !== restaurant);
    onChange(newRestaurants);
  };

  const updateVisited = (restaurant, visited) => {
    const newRestaurants = restaurants.map((r) => {
      if (r !== restaurant) {
        return r;
      }
      return { ...r, visited };
    });
    onChange(newRestaurants);
  };

  return (
    <ResponsiveDialog
      title="Restaurants"
      open={open}
      onClose={onClose}
      saveButton={saveButton}
    >
      <div className="manage-restaurant-dialog-body">
        <div className="manage-restaurant-dialog-autocomplete">
          <PlacesAutoComplete
            types="establishment"
            placeholder="Enter a restaurant"
            onSelect={handleRestaurantSelection}
            allowedTypes={["restaurant"]}
            location={location}
            value={inputValue}
            onChange={setInputValue}
          />
          <ManageRestaurantsList
            restaurants={restaurants}
            onVisitedChange={updateVisited}
            onRemove={removeRestaurant}
          />
        </div>
      </div>
    </ResponsiveDialog>
  );
}

export default ManageRestaurantsDialog;
