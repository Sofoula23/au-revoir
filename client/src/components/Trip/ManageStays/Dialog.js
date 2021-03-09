import React, { useState } from "react";

import ResponsiveDialog from "../../ResponsiveDialog";
import PlacesAutoComplete from "../../PlacesAutoComplete";
import ManageStaysList from "./List";

import "./styles.css";

function ManageStaysDialog({
  open,
  onClose,
  saveButton,
  location,
  stays,
  onChange,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleStaySelection = (place) => {
    onChange([...stays, { place }]);
    setInputValue("");
  };

  const removeStay = (stay) => {
    const newStays = stays.filter((r) => r !== stay);
    onChange(newStays);
  };

  return (
    <ResponsiveDialog
      title="Stays"
      open={open}
      onClose={onClose}
      saveButton={saveButton}
    >
      <div className="manage-stay-dialog-body">
        <div className="manage-stay-dialog-autocomplete">
          <PlacesAutoComplete
            types="establishment"
            placeholder="Enter a stay"
            onSelect={handleStaySelection}
            allowedTypes={["lodging"]}
            location={location}
            value={inputValue}
            onChange={setInputValue}
          />
          <ManageStaysList stays={stays} onRemove={removeStay} />
        </div>
      </div>
    </ResponsiveDialog>
  );
}

export default ManageStaysDialog;
