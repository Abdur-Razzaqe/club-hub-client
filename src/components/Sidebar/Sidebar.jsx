import { NavLink } from "react-router";

import useRole from "../../hooks/useRole";
import { Home } from "lucide-react";

const Sidebar = () => {
  const [role] = useRole();
  const adminMenu = [
    {
      path: "/dashboard/admin",
      label: "Admin Overview",
      icon: <Home size={20} />,
    },
    { path: "/dashboard/admin/manage-users", label: "Manage Users" },
    { path: "/dashboard/admin/manage-clubs", label: "Manage Clubs" },
    { path: "/dashboard/admin/payments", label: "Admin Payments" },
  ];
  const managerMenu = [
    { path: "/dashboard/manager", label: "Manager Overview" },
    { path: "/dashboard/manager/create-club", label: "Create Club" },
    { path: "/dashboard/manager/my-clubs", label: "My Clubs" },
    { path: "/dashboard/manager/club-members", label: "Club Members" },
    { path: "/dashboard/manager/create-event", label: "Create Event" },
    { path: "/dashboard/manager/my-events", label: "Manage Events" },
  ];
  const memberMenu = [
    {
      path: "/dashboard/member",
      label: "Member Overview",
      icon: <Home size={20} />,
    },
    { path: "/dashboard/member/my-clubs", label: "My Clubs" },
    { path: "/dashboard/member/my-events", label: "My Event" },
    { path: "/dashboard/member/payments", label: "Payment History" },
  ];

  let menu =
    role === "admin"
      ? adminMenu
      : role === "manager"
      ? managerMenu
      : memberMenu;
  return (
    <div className="p-5 space-y-2">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded transition ${
              isActive ? "bg-teal-500" : "hover:bg-gray-200"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
