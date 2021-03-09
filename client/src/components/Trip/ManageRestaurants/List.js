import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./styles.css";

function ManageRestaurantsList({ restaurants, onVisitedChange, onRemove }) {
  return (
    <List>
      {restaurants.map((restaurant) => (
        <ListItem
          key={restaurant.placeId}
          className="manage-restaurant-dialog-list-item"
        >
          <div className="manage-restaurant-dialog-list-item-visited">
            <Checkbox
              checked={Boolean(restaurant.visited)}
              onChange={(e) =>
                onVisitedChange(restaurant, e.currentTarget.checked)
              }
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div className="manage-restaurant-dialog-list-item-name">
            <ListItemText primary={restaurant.name} />
            <Typography variant="body2" color="textSecondary">
              {restaurant.formatted_address}
            </Typography>
          </div>

          <IconButton
            color="primary"
            aria-label="Remove restaurant"
            onClick={() => onRemove(restaurant)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ManageRestaurantsList;
