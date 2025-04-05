import { Event, FilterList } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useUIContext } from "../../../stores/store";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(() => {
  const {
    activityStoreInstance: { setFilter, setStartDate, filter, startDate },
  } = useUIContext();
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
            <MenuItem
              selected={filter === "all"}
              onClick={() => setFilter("all")}
            >
              <ListItemText primary="All Activities" />
            </MenuItem>
            <MenuItem
              selected={filter === "isGoing"}
              onClick={() => setFilter("isGoing")}
            >
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem
              selected={filter === "isHost"}
              onClick={() => setFilter("isHost")}
            >
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
        <Calendar
          value={startDate}
          onChange={(date) => setStartDate((date as Date).toISOString())}
        />
      </Box>
    </Box>
  );
});

export default ActivityFilters;
