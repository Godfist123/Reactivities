import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import ActivityList from "./ActivityList";
import Home from "./Home";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "../Components/Activity/ActivityForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayouts />}>
            <Route index element={<Home />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/editActivities/:id" element={<ActivityForm />} />
            <Route path="/editActivities" element={<ActivityForm />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
