import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import ActivityList from "./ActivityList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayouts />}>
            <Route path="/activities" element={<ActivityList />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
