import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import { IActivity } from "../../../Domain/Activity";

interface ActivityCardProps {
  data: IActivity;
  SelectActivityHandler: (activity: IActivity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
  const { data, SelectActivityHandler } = props;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{data.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {data.date}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.description}
        </Typography>
        <Typography variant="subtitle1">
          {data.city} / {data.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", display: "flex" }}>
        <Chip label={data.category} variant="outlined" />
        <Button
          size="small"
          variant="outlined"
          onClick={() => SelectActivityHandler(data)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
