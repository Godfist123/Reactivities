import React from "react";
import { IActivity } from "../../../Domain/Activity";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ActivityDetailProps {
  data: IActivity | null;
  CancelSelectActivityHandler: () => void;
  HandleEditOn: (id?: string) => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = (props) => {
  const { data, CancelSelectActivityHandler, HandleEditOn } = props;
  console.log(data);

  return (
    <>
      {data && (
        <Card sx={{ borderRadius: 3, mt: 1 }}>
          <CardMedia
            component="img"
            src={`/images/categoryImages/${data.category}.jpg`}
          />
          <CardContent>
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="subtitle1" fontWeight="light">
              {data.date}
            </Typography>
            <Typography variant="body1">{data.description}</Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => HandleEditOn(data.id)}>
              Edit
            </Button>
            <Button color="inherit" onClick={CancelSelectActivityHandler}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default ActivityDetail;
