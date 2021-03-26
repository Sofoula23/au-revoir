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
import Typography from "@material-ui/core/Typography";

import activityTypes from "./activityTypes";
import "./styles.css";

function ManageActivitiesList({ activities, onRemove }) {
  const [activityToRemove, setActivityToRemove] = useState(null);

  const openRemoveConfirmation = (activity) => {
    setActivityToRemove(activity);
  };

  const closeRemoveConfirmation = () => {
    setActivityToRemove(null);
  };

  const confirmRemoval = () => {
    closeRemoveConfirmation();
    onRemove(activityToRemove);
  };

  return (
    <List>
      {activities.map((activity, index) => {
        const activityType = activityTypes.find(
          (at) => at.key === activity.activityType
        );
        return (
          <ListItem
            key={`${activity.name}-${activity.age}-${index}`}
            className="manage-activity-dialog-list-item"
          >
            <ListItemAvatar>
              <Avatar>{activityType.icon}</Avatar>
            </ListItemAvatar>
            <div className="manage-activity-dialog-list-item-details">
              <ListItemText primary={activity.description} />
              <Typography variant="body2" color="textSecondary">
                {activityType.label}
              </Typography>
            </div>
            <IconButton
              color="primary"
              aria-label="Remove activity"
              onClick={() => openRemoveConfirmation(activity)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}

      <Dialog
        open={Boolean(activityToRemove)}
        onClose={closeRemoveConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this activity?
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

export default ManageActivitiesList;
