import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Box, Container, CssBaseline } from "@mui/material";

const MainLayouts = () => {
  return (
    <Box sx={{ bgcolor: "#eeeeee", ml: 1, mr: 1, minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 14 }}>
        <Outlet />
      </Container>
      <footer></footer>
    </Box>
  );
};

export default MainLayouts;
