
import DashboardPage from "../views/dashboardPages/Dashboard";
import NursesPage from "../views/dashboardPages/Nurses";
import ProfilePage from "../views/dashboardPages/Profile/DoctorProfile";
import PatientsPage from "../views/dashboardPages/Patients";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Patients from "@material-ui/icons/Favorite";
import Nurses from "@material-ui/icons/LocalHospital";

const dashboardRoutes = [
  {
    path: "/doctor",
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
    path: "/nurses",
    name: "Nurses",
    icon: Nurses,
    component: NursesPage,
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
