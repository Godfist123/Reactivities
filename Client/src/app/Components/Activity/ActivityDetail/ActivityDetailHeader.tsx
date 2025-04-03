import { Card, Badge, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { IActivity } from "../../../../Domain/Activity";
import { format } from "date-fns";
import { useActivityList } from "../../../Hooks/useActivityList";
import StyledBUtton from "../../Utils/StyledButton";

interface ActivityDetailsHeaderProps {
  data: IActivity;
}

export default function ActivityDetailsHeader({
  data,
}: ActivityDetailsHeaderProps) {
  const { updateAttendance } = useActivityList(data.id);

  return (
    <Card
      sx={{
        position: "relative",
        mb: 2,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {data.isCancelled && (
        <Chip
          sx={{ position: "absolute", left: 40, top: 20, zIndex: 1000 }}
          color="error"
          label="Cancelled"
        />
      )}
      <CardMedia
        component="img"
        height="300"
        image={`/images/categoryImages/${data.category}.jpg`}
        alt={`${data.category} image`}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          color: "white",
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)",
          boxSizing: "border-box",
        }}
      >
        {/* Text Section */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {data.title}
          </Typography>
          <Typography variant="subtitle1">
            {format(new Date(data.date), "dd MMM yyyy h:mm a")}
          </Typography>
          <Typography variant="subtitle2">
            Hosted by{" "}
            <Link
              to={`/profiles/${data.hostId}`}
              style={{ color: "white", fontWeight: "bold" }}
            >
              {data.hostDisplayName}
            </Link>
          </Typography>
        </Box>

        {/* Buttons aligned to the right */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {data.isHost ? (
            <>
              <StyledBUtton
                variant="contained"
                color={data.isCancelled ? "success" : "error"}
                onClick={() => {
                  updateAttendance.mutate(data.id);
                }}
                disabled={updateAttendance.isPending}
              >
                {data.isCancelled ? "Re-activate Activity" : "Cancel Activity"}
              </StyledBUtton>
              <StyledBUtton
                variant="contained"
                color="primary"
                component={Link}
                to={`/editActivities/${data.id}`}
                disabled={data.isCancelled}
              >
                Manage Event
              </StyledBUtton>
            </>
          ) : (
            <StyledBUtton
              variant="contained"
              color={data.isGoing ? "primary" : "info"}
              onClick={() => {
                updateAttendance.mutate(data.id);
              }}
              disabled={updateAttendance.isPending || data.isCancelled}
            >
              {data.isGoing ? "Cancel Attendance" : "Join Activity"}
            </StyledBUtton>
          )}
        </Box>
      </Box>
    </Card>
  );
}
