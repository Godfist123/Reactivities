import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Profile } from "../../../Domain/Profile";
import { useProfile } from "../../Hooks/useProfile";
import { getCurrentUser } from "../../Utils/GetCurrentUser";

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const { updateFollowing } = useProfile(profile.id);
  const toggleFollow = () => {
    updateFollowing.mutate(profile.id);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={8}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={profile.imageUrl}
              alt="Profile Picture"
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h4">{profile.displayName}</Typography>
              {profile.isFollowing && (
                <Chip
                  label="Following"
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              )}
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={4}>
          <Stack spacing={2} alignItems="center">
            <Box
              display="flex"
              justifyContent="space-around"
              width="100%"
              gap={3}
            >
              <Box textAlign="center">
                <Typography variant="h5">Followers</Typography>
                <Typography variant="h4">{profile.followersCount}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5">Following</Typography>
                <Typography variant="h4">{profile.followingCount}</Typography>
              </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Button
              fullWidth
              variant="outlined"
              color={profile.isFollowing ? "error" : "success"}
              onClick={toggleFollow}
              disabled={
                getCurrentUser()?.sub === profile.id ||
                updateFollowing.isPending
              }
            >
              {profile.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default ProfileHeader;
