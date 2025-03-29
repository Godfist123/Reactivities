import { Grid2, Typography } from "@mui/material";
import React from "react";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileContent from "../Components/Profile/ProfileContent";
import { useProfile } from "../Hooks/useProfile";
import { useParams } from "react-router-dom";

interface ProfileProps {
  // Define your props here
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { profile, isLoading } = useProfile(id!);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!profile) return <Typography>Profile not found</Typography>;

  return (
    <Grid2 container>
      <Grid2 size={12}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid2>
    </Grid2>
  );
};

export default Profile;
