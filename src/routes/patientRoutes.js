
import DashboardPage from "../views/dashboardPages/Dashboard";
import ProfilePage from "../views/dashboardPages/Profile";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";


const dashboardRoutes = [
  {
    path: "/patient",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: Person,
    component: ProfilePage,
    layout: "/dashboard"
  }
];

export default dashboardRoutes;
