import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../Hooks/useProfile";
import { Box, Divider, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

interface ProfileFollowingsProps {
  activeTab: number;
}

const ProfileFollowings: React.FC<ProfileFollowingsProps> = ({ activeTab }) => {
  const { id } = useParams<{ id: string }>();
  const predicate = activeTab === 3 ? "followers" : "following";
  const { profile, followings, loadingFollowings } = useProfile(id, predicate);

  return (
    <Box>
      <Box display="flex">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {activeTab === 3
            ? `People following ${profile?.displayName}`
            : `People ${profile?.displayName} is following`}
        </Typography>
      </Box>
      <Divider />
      {loadingFollowings ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <Box display="flex" sx={{ mt: 3, gap: 3 }}>
          {followings?.map((following) => (
            <ProfileCard key={following.id} profile={following} />
          ))}
          {followings?.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              No {predicate} found.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileFollowings;
