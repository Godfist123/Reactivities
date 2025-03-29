import { Delete, DeleteOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";

interface DeleteButtonProps {}

const DeleteButton: React.FC<DeleteButtonProps> = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        sx={{
          opacity: 0.8,
          transition: "opacity 0.3s",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <DeleteOutline
          sx={{
            fontSize: 32,
            color: "white",
            position: "absolute",
          }}
        />
        <Delete
          sx={{
            fontSize: 28,
            color: "rgba(0,0,0,0.5)",
          }}
        />
      </Button>
    </Box>
  );
};

export default DeleteButton;
