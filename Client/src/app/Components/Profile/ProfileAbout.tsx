import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../Hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";

interface ProfileAboutProps {
  // Define your props here
}

const ProfileAbout: React.FC<ProfileAboutProps> = () => {
  const { id } = useParams();
  const { profile } = useProfile(id as string);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          About {profile?.displayName}
        </Typography>
        <Button>Edit</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {profile?.bio || "No bio available."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileAbout;
