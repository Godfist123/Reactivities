import React from "react";
import { Profile } from "../../../Domain/Profile";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const following = false;
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{ borderRadius: 3, p: 3, maxWidth: 300, textDecoration: "none" }}
        elevation={3}
      >
        <CardMedia
          component="img"
          height="200"
          sx={{ width: 200 }}
          src={profile.imageUrl || "/images/user.png"}
          alt={`${profile.displayName} profile image`}
        />
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5">{profile.displayName}</Typography>
            {profile.bio && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {profile.bio}
              </Typography>
            )}
            {following && (
              <Chip
                size="small"
                label="Following"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Person />
          <Typography sx={{ ml: 1 }}>20 followers</Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default ProfileCard;
