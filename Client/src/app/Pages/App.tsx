import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import ActivityList from "./ActivityList";
import Home from "./Home";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";
import TestErrors from "../Components/Error/TestError";
import Error from "../Components/Error/Error";
import Login from "./Login";
import PrivateRoute from "../Layouts/PrivateRoute";
import Register from "./Register";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayouts />}>
            <Route index element={<Home />} />
            <Route
              path="/activities"
              element={
                <PrivateRoute>
                  <ActivityList />
                </PrivateRoute>
              }
            />
            <Route
              path="/activities/:id"
              element={
                <PrivateRoute>
                  <ActivityDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/editActivities/:id"
              element={
                <PrivateRoute>
                  <ActivityForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/editActivities"
              element={
                <PrivateRoute>
                  <ActivityForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/profiles/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="errors" element={<TestErrors />}></Route>
            <Route path="/error/:status" element={<Error />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
