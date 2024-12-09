import { BrowserRouter as Router, Routes, Route } from "react-router";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { NotFound } from "../components/NotFound/NotFound";
import { Dashboard } from "../components/Dashboard/Dashboard";
import PublicRoutes from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import { RoomDetails } from "../components/Dashboard/Rooms/RoomDetails/RoomDetails";
import { Reservations } from "../components/Dashboard/Reservations/Reservations";

const AppRoutes = () => (
  <Router>
    {" "}
    <MainLayout>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<PublicRoutes />} />{" "}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              {" "}
              <Routes>
                {" "}
                <Route path="" element={<Dashboard />} />{" "}
                <Route path="room/:id" element={<RoomDetails />} />{" "}
                <Route path="my-reservations" element={<Reservations />} />{" "}
              </Routes>{" "}
            </PrivateRoute>
          }
        />{" "}
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>{" "}
    </MainLayout>{" "}
  </Router>
);

export default AppRoutes;
