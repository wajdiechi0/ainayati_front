
import DashboardPage from "../views/dashboardPages/Dashboard";
import ProfilePage from "../views/dashboardPages/Profile/NurseProfile";
import PatientsPage from "../views/dashboardPages/Patients";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Patients from "@material-ui/icons/Favorite";

const dashboardRoutes = [
  {
    path: "/nurse",
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
  },
  {
    path: "/patients",
    name: "Patients",
    icon: Patients,
    component: PatientsPage,
    layout: "/dashboard"
  }
];

export default dashboardRoutes;
