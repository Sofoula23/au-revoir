import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import ResponsiveDialog from "../../../ResponsiveDialog";
import PlacesAutoComplete from "../../../PlacesAutoComplete";

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
        </div>
        <List>
          {restaurants.map((restaurant) => (
            <ListItem
              key={restaurant.placeId}
              className="manage-restaurant-dialog-list-item"
            >
              <ListItemText primary={restaurant.name} />
              <IconButton
                color="primary"
                aria-label="Remove restaurant"
                onClick={() => removeRestaurant(restaurant)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </ResponsiveDialog>
  );
}

export default ManageRestaurantsDialog;
