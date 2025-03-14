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
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../stores/store";
import { Observer } from "mobx-react-lite";

interface NavBarProps {
  // Define your props here
}

const NavBar: React.FC<NavBarProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navi = useNavigate();
  const uiContext = useUIContext();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const activityHandler = () => {
    handleMenuClose();
    navi("/activities");
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
                  onClick={() => navi("/editActivities")}
                >
                  Create
                </Button>
              </Box>
              <Box>
                <IconButton
                  onClick={(e) => handleMenuOpen(e)}
                  color="inherit"
                  size="medium"
                  edge="end"
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={activityHandler}>Activities</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Create Activity</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <Observer>
          {() => {
            return (
              <>
                {uiContext.uiStoreInstance.isLoading ? (
                  <LinearProgress
                    color="secondary"
                    sx={{
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "3px",
                    }}
                  />
                ) : null}
              </>
            );
          }}
        </Observer>
      </AppBar>
    </Box>
  );
};

export default NavBar;
