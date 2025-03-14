import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid2, Paper, Typography } from "@mui/material";
import { IActivity } from "../../../../Domain/Activity";
import { format } from "date-fns";

interface ActivityDetailsInfoProps {
  data: IActivity;
}

export default function ActivityDetailsInfo({
  data,
}: ActivityDetailsInfoProps) {
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
          <Typography>{format(data.date, "dd MMM yyyy h:mm a")}</Typography>
        </Grid2>
      </Grid2>
      <Divider />

      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Place color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography>
            {data.venue},{data.city}
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
}
