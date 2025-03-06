import { Group, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useActivityContext } from "../Context/ActivityContext";

interface NavBarProps {
  // Define your props here
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { editMode, setEditMode } = useActivityContext();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg,rgb(64, 67, 99) 0%,rgb(107, 117, 254) 30%,rgb(21, 23, 173) 90%)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Group fontSize="medium" />
              <Typography variant="subtitle1" fontWeight="bold">
                Reactivities
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box>
                <Button
                  sx={{ color: "white" }}
                  variant="text"
                  onClick={() => setEditMode(true)}
                >
                  Create
                </Button>
              </Box>
              <Box>
                <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                  size="medium"
                  edge="end"
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>Activities</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Create Activity</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
