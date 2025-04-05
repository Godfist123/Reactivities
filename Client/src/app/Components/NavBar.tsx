import {
  Add,
  Group,
  Logout,
  Menu as MenuIcon,
  Person,
} from "@mui/icons-material";
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
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../stores/store";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../Hooks/useAccount";
import { User } from "../../Domain/User";
import { useProfile } from "../Hooks/useProfile";

interface NavBarProps {
  // Define your props here
}

const NavBar: React.FC<NavBarProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const navi = useNavigate();
  const uiContext = useUIContext();
  const { getCurrentUser, logout } = useAccount();
  const { profile } = useProfile(user?.sub!);

  useEffect(() => {
    const syncUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = getCurrentUser();
        setUser(user);
      } else {
        setUser(null);
      }
    };

    // Run once on mount
    syncUser();

    // ✅ Listen for custom logout event
    window.addEventListener("user-logout", syncUser);

    // 🔄 Cleanup on unmount
    return () => {
      window.removeEventListener("user-logout", syncUser);
    };
  }, []);
  console.log(user);

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
  const errorTestHandler = () => {
    handleMenuClose();
    navi("/errors");
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
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
              <Group fontSize="large" />
              <Typography
                variant="subtitle1"
                fontSize={30}
                fontWeight="bold"
                sx={{ position: "relative" }}
              >
                Reactivities
              </Typography>
              <Observer>
                {() => {
                  return (
                    <>
                      {uiContext.uiStoreInstance.isLoading ? (
                        <CircularProgress
                          size={20}
                          thickness={5}
                          sx={{
                            color: "white",
                            top: "32%",
                            position: "absolute",
                            left: "21%",
                          }}
                        />
                      ) : null}
                    </>
                  );
                }}
              </Observer>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box>
                <IconButton
                  onClick={(e) => handleMenuOpen(e)}
                  color="inherit"
                  size="medium"
                  edge="end"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={profile?.imageUrl} alt="User Avatar" />
                    {user?.displayName}
                  </Box>
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={activityHandler}>Activities</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navi("/editActivities");
                    }}
                  >
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText>Create Activity</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navi(`/profiles/${user?.sub}`);
                    }}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logout();
                    }}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={errorTestHandler}>Errors</MenuItem>
                </Menu>
              </Box>
              <Box display="flex" alignItems="center">
                {user ? (
                  <Typography variant="subtitle1" sx={{ color: "white" }}>
                    {`Welcome ${user.displayName}`}
                  </Typography>
                ) : (
                  <>
                    <Button
                      sx={{ color: "white" }}
                      size="small"
                      variant="text"
                      onClick={() => navi("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      sx={{ color: "white" }}
                      variant="text"
                      size="small"
                      onClick={() => navi("/register")}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
