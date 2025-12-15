import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Manager/ManagerOverview";
import CreateClub from "../pages/Dashboard/Manager/CreateClub";
import FeaturedClubs from "../pages/Home/FeaturedClubs/FeaturedClubs";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/ClubDetails/ClubDetails";
import CreateEvent from "../pages/Dashboard/Manager/CreateEvent";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";

import AdminStats from "../pages/Dashboard/Admin/AdminStats";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import ManagerRoute from "./ManagerRoute";
import ManagerOverview from "../pages/Dashboard/Manager/ManagerOverview";
import MyClubs from "../pages/Dashboard/Manager/MyClubs";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";
import ManageEvent from "../pages/Dashboard/Manager/ManageEvent";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import MemberClubs from "../pages/Dashboard/Members/MemberClubs";
import MemberEvents from "../pages/Dashboard/Members/MemberEvents";
import MemberPaymentHistory from "../pages/Dashboard/Members/MemberPaymentHistory";

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
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminStats />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-clubs",
        element: (
          <AdminRoute>
            <ManageClubs />
          </AdminRoute>
        ),
      },
      {
        path: "manager",
        element: (
          <ManagerRoute>
            <ManagerOverview />
          </ManagerRoute>
        ),
      },
      {
        path: "create-club",
        element: (
          <ManagerRoute>
            <CreateClub />
          </ManagerRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <ManagerRoute>
            <MyClubs />
          </ManagerRoute>
        ),
      },
      {
        path: "create-event",
        element: (
          <ManagerRoute>
            <CreateEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <ManagerRoute>
            <ManageEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "event-registrations/:eventId",
        element: (
          <ManagerRoute>
            <EventRegistrations />
          </ManagerRoute>
        ),
      },
      {
        path: "member",
        element: (
          <MemberRoute>
            <ManagerOverview />
          </MemberRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <MemberRoute>
            <MemberClubs />
          </MemberRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <MemberRoute>
            <MemberEvents />
          </MemberRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <MemberRoute>
            <MemberPaymentHistory />
          </MemberRoute>
        ),
      },
    ],
  },
]);
