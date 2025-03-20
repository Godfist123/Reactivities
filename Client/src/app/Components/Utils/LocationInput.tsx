import React, { useMemo } from "react";
import { LocationIQSuggestion } from "../../../Domain/Location";
import { Controller } from "react-hook-form";
import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

interface LocationInputProps {
  name: string;
  control: any;
  label: string;
}

const LocationInput: React.FC<LocationInputProps> = (props) => {
  const { name, control, label } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [suggestions, setSuggestions] = React.useState<LocationIQSuggestion[]>(
    []
  );
  const locationUrl =
    "https://api.locationiq.com/v1/autocomplete?key=pk.23d47ff94b3fa425f925625ea77cfedc&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value || value.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}q=${value}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationUrl]
  );

  const handleSelect = (
    suggestion: LocationIQSuggestion,
    onChange: (value: {
      venue: string;
      latitude: number;
      longitude: number;
      city?: string;
    }) => void
  ) => {
    console.log(suggestion);
    const city =
      suggestion.address?.city ||
      suggestion.address?.town ||
      suggestion.address?.village ||
      suggestion.address?.name;
    const latitude = parseFloat(suggestion.lat);
    const longitude = parseFloat(suggestion.lon);
    const venue = suggestion.display_name;
    onChange({ venue, latitude, longitude, city });
    setSuggestions([]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box>
          <TextField
            onChange={(e) => {
              onChange({ ...value, venue: e.target.value });
              fetchSuggestions(e.target.value);
            }}
            fullWidth
            label={label}
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            value={value?.venue || ""}
          />
          {loading && <Typography>Loading...</Typography>}
          {suggestions.length > 0 && (
            <List sx={{ border: 1 }}>
              {suggestions.map((suggestion) => (
                <ListItemButton
                  key={suggestion.place_id}
                  divider
                  onClick={() => {
                    handleSelect(suggestion, onChange);
                  }}
                >
                  {suggestion.display_name}
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      )}
    />
  );
};

export default LocationInput;
