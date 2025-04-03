import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { IActivity } from "../../../../Domain/Activity";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import MapComponent from "../../Utils/MapComponent";

interface ActivityDetailsInfoProps {
  data: IActivity;
}

export default function ActivityDetailsInfo({
  data,
}: ActivityDetailsInfoProps) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Paper sx={{ mb: 2 }}>
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Info color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography>{data.description}</Typography>
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography>
            {format(new Date(data.date), "dd MMM yyyy h:mm a")}
          </Typography>
        </Grid2>
      </Grid2>
      <Divider />

      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Place color="info" fontSize="large" />
        </Grid2>
        <Grid2
          size={11}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            {data.venue},{data.city}
          </Typography>
          <Button
            sx={{ mx: 2, whiteSpace: "nowrap" }}
            onClick={() => {
              setMapOpen(!mapOpen);
            }}
          >
            {mapOpen ? "Hide Map" : "Show Map"}
          </Button>
        </Grid2>
      </Grid2>
      {mapOpen && (
        <Box sx={{ height: 400, display: "block" }}>
          <MapComponent
            position={[data.latitude, data.longitude]}
            venue={data.venue}
          />
        </Box>
      )}
    </Paper>
  );
}
