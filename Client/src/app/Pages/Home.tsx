import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {
  // Define your props here
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <Paper
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: 6,
        backgroundImage:
          "linear-gradient(135deg,rgb(64, 67, 99) 0%,rgb(107, 117, 254) 30%,rgb(21, 23, 173) 90%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          color: "white",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Group sx={{ height: "100px", width: "100px" }} />
        <Typography variant="h1">Reactivities</Typography>
      </Box>
      <Typography variant="h2">Welcome to Reactivities</Typography>
      <Button
        component={Link}
        to="/activities"
        size="large"
        variant="contained"
        sx={{ height: "80", borderRadius: 4, fontSize: "1.5rem" }}
      >
        Take me to the Activities!
      </Button>
    </Paper>
  );
};

export default Home;
