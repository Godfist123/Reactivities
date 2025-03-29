import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { IActivity } from "../../../../Domain/Activity";
import { Link, useNavigate } from "react-router-dom";
import { AccessTime, Place } from "@mui/icons-material";
import { format } from "date-fns";
import AvatarPopover from "../../Utils/AvatarPopover";

interface ActivityCardProps {
  data: IActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
  const { data } = props;
  const navi = useNavigate();

  const label = data.isHost ? "Hosted" : "Going";
  const color = data.isHost
    ? "secondary"
    : data.isGoing
    ? "warning"
    : "default";

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ Height: 80, Width: 80 }}
              src={data.hostImageUrl}
              alt="image of host"
            />
          }
          title={data.title}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 20,
          }}
          subheader={
            <>
              Hosted by{" "}
              <Link to={`/profiles/${data.hostId}`}>
                {data.hostDisplayName}
              </Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(data.isHost || data.isGoing) && (
            <Chip
              label={label}
              color={color}
              sx={{ borderRadius: 2 }}
              variant="outlined"
            />
          )}
          {data.isCancelled && (
            <Chip label="Canceled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" justifyContent="flex-start" mb={2} px={1}>
          <Box display="flex" alignItems="center" flexGrow={0}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {format(data.date, "dd MMM yyyy h:mm a")}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{data.venue}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          sx={{ backgroundColor: "grey.200", py: 2, px: 2, mb: 1 }}
        >
          {data.attendees.map((attendee) => (
            <AvatarPopover key={attendee.id} profile={attendee} />
          ))}
        </Box>
      </CardContent>

      <CardActions
        sx={{ pb: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="body2">{data.description}</Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navi(`/activities/${data.id}`)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
