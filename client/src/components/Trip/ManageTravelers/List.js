import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { getInitials } from "../../../utils/getInitials";

import "./styles.css";

function ManageTravelersList({ travelers, onRemove }) {
  const [travelerToRemove, setTravelerToRemove] = useState(null);

  const openRemoveConfirmation = (traveler) => {
    setTravelerToRemove(traveler);
  };

  const closeRemoveConfirmation = () => {
    setTravelerToRemove(null);
  };

  const confirmRemoval = () => {
    closeRemoveConfirmation();
    onRemove(travelerToRemove);
  };

  return (
    <List>
      {travelers.map((traveler, index) => (
        <ListItem
          key={`${traveler.name}-${traveler.age}-${index}`}
          className="manage-traveler-dialog-list-item"
        >
          <ListItemAvatar>
            <Avatar alt={traveler.name}>{getInitials(traveler.name)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${traveler.name} (Age: ${traveler.age})`} />

          <IconButton
            color="primary"
            aria-label="Remove traveler"
            onClick={() => openRemoveConfirmation(traveler)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}

      <Dialog
        open={Boolean(travelerToRemove)}
        onClose={closeRemoveConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this traveler?
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

export default ManageTravelersList;
