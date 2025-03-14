import { Event, FilterList } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
interface ActivityFiltersProps {
  // Define your props here
}

const ActivityFilters: React.FC<ActivityFiltersProps> = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, borderRadius: 3 }}
    >
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            sx={{ mb: 1 }}
            color="primary"
          >
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary="All Activities" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting" />
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          color="primary"
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <Event sx={{ mr: 1 }} />
          Date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
};

export default ActivityFilters;
