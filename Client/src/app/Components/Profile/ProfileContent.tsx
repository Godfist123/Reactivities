import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

interface ProfileContentProps {
  // Define your props here
}

const ProfileContent: React.FC<ProfileContentProps> = () => {
  const [value, setValue] = useState(0);
  const tabContent = [
    {
      label: "About",
      content: <ProfileAbout />,
    },
    {
      label: "Photos",
      content: <ProfilePhotos />,
    },
    {
      label: "Events",
      content: <div>Events</div>,
    },
    {
      label: "Followers",
      content: <ProfileFollowings activeTab={3} />,
    },
    {
      label: "Following",
      content: <ProfileFollowings activeTab={4} />,
    },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={500}
      gap={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: 3,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, height: 450, minWidth: 200 }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
        ))}
      </Tabs>
      <Box flexGrow={1}>{tabContent[value].content}</Box>
    </Box>
  );
};

export default ProfileContent;
