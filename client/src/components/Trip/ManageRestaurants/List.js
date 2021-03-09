import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./styles.css";

function ManageRestaurantsList({ restaurants, onVisitedChange, onRemove }) {
  const [restaurantToRemove, setRestaurantToRemove] = useState(null);

  const openRemoveConfirmation = (restaurant) => {
    setRestaurantToRemove(restaurant);
  };

  const closeRemoveConfirmation = () => {
    setRestaurantToRemove(null);
  };

  const confirmRemoval = () => {
    closeRemoveConfirmation();
    onRemove(restaurantToRemove);
  };

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
            <ListItemText primary={restaurant.place.name} />
            <Typography variant="body2" color="textSecondary">
              {restaurant.place.formatted_address}
            </Typography>
          </div>

          <IconButton
            color="primary"
            aria-label="Remove restaurant"
            onClick={() => openRemoveConfirmation(restaurant)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
      <Dialog
        open={Boolean(restaurantToRemove)}
        onClose={closeRemoveConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoval} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}

export default ManageRestaurantsList;
