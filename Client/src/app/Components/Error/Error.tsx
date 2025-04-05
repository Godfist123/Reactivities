import { SearchOff } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

interface NotFoundProps {
  // Define your props here
}

const Error: React.FC<NotFoundProps> = () => {
  const { status } = useParams();
  const { state } = useLocation();
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        flexDirection: "column",
        p: 6,
      }}
    >
      <SearchOff sx={{ fontSize: 100 }} color="primary" />
      <Typography variant="h3" color="primary">
        {(() => {
          switch (status) {
            case "400":
              return "Bad Request";
            case "401":
              return "Unauthorized";
            case "403":
              return "Forbidden";
            case "404":
              return "Not Found";
            case "500":
              console.log(state);

              return (
                <Box>
                  <Typography
                    variant="h3"
                    color="warning"
                    sx={{
                      mb: 2,
                      borderTop: 1,
                      borderBottom: 1,
                      borderColor: "grey.500",
                      py: 2,
                    }}
                  >
                    {state.error.message
                      ? state.error.message
                      : "Internal Server Error"}
                  </Typography>
                  {state.error.traces && (
                    <Typography variant="body1" color="primary" sx={{ mb: 5 }}>
                      {state.error.traces}
                    </Typography>
                  )}
                </Box>
              );
              break;
            default:
              return "Something went wrong";
          }
        })()}
      </Typography>
      <Button
        sx={{ mt: 2 }}
        fullWidth
        component={Link}
        to="/"
        variant="contained"
        color="primary"
      >
        Return to Home
      </Button>
    </Paper>
  );
};

export default Error;
