import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateClub from "../pages/Dashboard/Manager/CreateClub";
import FeaturedClubs from "../pages/Home/FeaturedClubs/FeaturedClubs";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/ClubDetails/ClubDetails";
import CreateEvent from "../pages/Dashboard/Manager/CreateEvent";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";
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
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import MemberOverview from "../pages/Dashboard/Members/MemberOverview";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import PaymentCancel from "../pages/Dashboard/Payments/PaymentCancel";
import AdminPayments from "../pages/Dashboard/Admin/AdminPayments";
import ClubMembers from "../pages/Dashboard/Manager/ClubMembers";
import Profile from "../pages/Common/Profile";
import ErrorPage from "../pages/ErrorPage";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "events",
        element: <Events />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "clubs/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "events/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-clubs",
        element: (
          <AdminRoute>
            <ManageClubs />
          </AdminRoute>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <AdminRoute>
            <AdminPayments />
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
        path: "manager/create-club",
        element: (
          <ManagerRoute>
            <CreateClub />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/my-clubs",
        element: (
          <ManagerRoute>
            <MyClubs />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/club-members",
        element: (
          <ManagerRoute>
            <ClubMembers />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/create-event",
        element: (
          <ManagerRoute>
            <CreateEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/my-events",
        element: (
          <ManagerRoute>
            <ManageEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/events/:eventId/registrations",
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
            <MemberOverview />
          </MemberRoute>
        ),
      },
      {
        path: "member/my-clubs",
        element: (
          <MemberRoute>
            <MemberClubs />
          </MemberRoute>
        ),
      },
      {
        path: "member/my-events",
        element: (
          <MemberRoute>
            <MemberEvents />
          </MemberRoute>
        ),
      },
      {
        path: "member/payments",
        element: (
          <MemberRoute>
            <MemberPaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
    ],
  },
]);
