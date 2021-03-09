import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./styles.css";

function ManageStaysList({ stays, onRemove }) {
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
            onClick={() => onRemove(stay)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ManageStaysList;
