import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ResponsiveDialog from "../../ResponsiveDialog";
import ManageTravelersList from "./List";

import "./styles.css";

function ManageTravelersDialog({
  open,
  onClose,
  saveButton,
  travelers,
  onChange,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleTravelerAdd = () => {
    onChange([...travelers, { name, age }]);
    setName("");
    setAge("");
  };

  const removeTraveler = (traveler) => {
    const newTravelers = travelers.filter((r) => r !== traveler);
    onChange(newTravelers);
  };

  return (
    <ResponsiveDialog
      title="Travelers"
      open={open}
      onClose={onClose}
      saveButton={saveButton}
    >
      <div className="manage-traveler-dialog-body">
        <div className="manage-traveler-dialog-autocomplete">
          <Grid container spacing={2} className="manage-traveler-dialog-form">
            <Grid
              item
              xs={12}
              sm={6}
              className="manage-traveler-dialog-name-field"
            >
              <TextField
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="manage-traveler-dialog-age-field"
            >
              <TextField
                type="number"
                label="Age"
                variant="filled"
                value={age}
                onChange={(e) => setAge(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12} className="manage-traveler-dialog-add-btn">
              <Button
                onClick={handleTravelerAdd}
                color="primary"
                variant="contained"
                autoFocus
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <ManageTravelersList
            travelers={travelers}
            onRemove={removeTraveler}
          />
        </div>
      </div>
    </ResponsiveDialog>
  );
}

export default ManageTravelersDialog;
