import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";

export const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
