
import DashboardPage from "../views/dashboardPages/Dashboard";
import ProfilePage from "../views/dashboardPages/Profile/NurseProfile";
import PatientsPage from "../views/dashboardPages/Patients";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Patients from "@material-ui/icons/Favorite";

const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/",
    name: "Profile",
    icon: Person,
    component: ProfilePage,
    layout: "/profile"
  },
  {
    path: "/",
    name: "Patients",
    icon: Patients,
    component: PatientsPage,
    layout: "/patients"
  }
];

export default dashboardRoutes;
