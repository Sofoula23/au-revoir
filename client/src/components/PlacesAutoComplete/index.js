import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

const DEFAULT_RADIUS = 90000;

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function PlacesAutoComplete({
  placeholder,
  types,
  location,
  radius = DEFAULT_RADIUS,
  onSelect,
  allowedTypes,
  value,
  onChange,
}) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(null);
  const [options, setOptions] = useState([]);

  const throttledAutocompleApi = useMemo(
    () =>
      throttle(async (input) => {
        const response = await axios.get("/api/places/autocomplete", {
          params: {
            input,
            types,
            location,
            radius,
          },
        });
        return response.data;
      }, 200),
    []
  );

  useEffect(() => {
    if (!value) {
      setSelectedValue(null);
      setOptions([]);
    }
  }, [value]);

  useEffect(() => {
    let active = true;

    if (value === "") {
      setOptions(selectedValue ? [selectedValue] : []);
      return undefined;
    }

    const getResults = async () => {
      const allResults = await throttledAutocompleApi(value);
      let results = allResults;
      if (allowedTypes) {
        results = allResults.filter((result) =>
          result.types.some((type) => allowedTypes.includes(type))
        );
      }
      if (active) {
        let newOptions = [];

        if (selectedValue) {
          newOptions = [selectedValue];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    };
    getResults();
    return () => {
      active = false;
    };
  }, [value, throttledAutocompleApi]);

  const handleSelect = async (selectedPlace) => {
    setSelectedValue(selectedPlace);
    if (!selectedPlace) {
      return;
    }
    const response = await axios.get(
      `/api/places/details/${selectedPlace.place_id}`
    );
    onSelect(response.data);
  };

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      inputValue={value}
      value={selectedValue}
      onChange={(event, selectedPlace) => {
        setOptions(selectedPlace ? [selectedPlace, ...options] : options);
        handleSelect(selectedPlace);
      }}
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
