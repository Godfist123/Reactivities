import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { CssBaseline } from "@mui/material";

type Props = {};

const MainLayouts = (props: Props) => {
  return (
    <div>
      <CssBaseline />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayouts;
