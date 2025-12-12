import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import CreateClub from "../pages/Dashboard/Manager/CreateClub";
import FeaturedClubs from "../pages/Home/FeaturedClubs/FeaturedClubs";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/ClubDetails/ClubDetails";
import CreateEvent from "../pages/Dashboard/Manager/CreateEvent";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "clubs",
        element: <Clubs />,
      },
      {
        path: "featured-clubs",
        element: <FeaturedClubs />,
      },
      {
        path: "clubs/:id",
        element: <ClubDetails />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <EventDetails />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "create-club",
        element: <CreateClub />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
    ],
  },
]);
