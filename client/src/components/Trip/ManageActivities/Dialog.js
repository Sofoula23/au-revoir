import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import ResponsiveDialog from "../../ResponsiveDialog";
import ManageActivitiesList from "./List";
import activityTypes from "./activityTypes";

import "./styles.css";

function ManageActivitiesDialog({
  open,
  onClose,
  saveButton,
  activities,
  onChange,
}) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleActivityAdd = () => {
    onChange([...activities, { activityType: type, description }]);
    setType("");
    setDescription("");
  };

  const removeActivity = (activity) => {
    const newActivities = activities.filter((r) => r !== activity);
    onChange(newActivities);
  };

  return (
    <ResponsiveDialog
      title="Activities"
      open={open}
      onClose={onClose}
      saveButton={saveButton}
    >
      <div className="manage-activity-dialog-body">
        <div className="manage-activity-dialog-autocomplete">
          <Grid container spacing={2} className="manage-activity-dialog-form">
            <Grid
              item
              xs={12}
              sm={6}
              className="manage-activity-dialog-type-field"
            >
              <FormControl>
                <InputLabel id="activity-type-select-label">Type</InputLabel>
                <Select
                  labelId="activity-type-select-label"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {activityTypes.map((at) => (
                    <MenuItem key={at.key} value={at.key}>
                      <div className="manage-activity-dialog-type-option">
                        {at.icon}
                        <Typography variant="body2" color="textSecondary">
                          {at.label}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="manage-activity-dialog-description-field"
            >
              <TextField
                label="Description"
                variant="filled"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12} className="manage-activity-dialog-add-btn">
              <Button
                onClick={handleActivityAdd}
                color="primary"
                variant="contained"
                autoFocus
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <ManageActivitiesList
            activities={activities}
            onRemove={removeActivity}
          />
        </div>
      </div>
    </ResponsiveDialog>
  );
}

export default ManageActivitiesDialog;
