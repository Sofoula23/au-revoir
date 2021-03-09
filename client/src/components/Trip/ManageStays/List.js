import React, { useState } from "react";
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

function ManageStaysList({ stays, onRemove }) {
  const [stayToRemove, setStayToRemove] = useState(null);

  const openRemoveConfirmation = (stay) => {
    setStayToRemove(stay);
  };

  const closeRemoveConfirmation = () => {
    setStayToRemove(null);
  };

  const confirmRemoval = () => {
    closeRemoveConfirmation();
    onRemove(stayToRemove);
  };

  return (
    <List>
      {stays.map((stay) => (
        <ListItem key={stay.placeId} className="manage-stay-dialog-list-item">
          <div className="manage-stay-dialog-list-item-name">
            <ListItemText primary={stay.place.name} />
            <Typography variant="body2" color="textSecondary">
              {stay.place.formatted_address}
            </Typography>
          </div>
          <IconButton
            color="primary"
            aria-label="Remove stay"
            onClick={() => openRemoveConfirmation(stay)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}

      <Dialog
        open={Boolean(stayToRemove)}
        onClose={closeRemoveConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this stay?
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

export default ManageStaysList;
