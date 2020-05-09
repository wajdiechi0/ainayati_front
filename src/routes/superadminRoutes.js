
import DashboardPage from "../views/dashboardPages/Dashboard";
import AdminsPage from "../views/dashboardPages/Admins";
import DoctorsPage from "../views/dashboardPages/Doctors";
import NursesPage from "../views/dashboardPages/Nurses";
import PatientsPage from "../views/dashboardPages/Patients";

import Dashboard from "@material-ui/icons/Dashboard";
import Doctors from "@material-ui/icons/AssignmentInd";
import Patients from "@material-ui/icons/Favorite";
import Nurses from "@material-ui/icons/LocalHospital";
import Admins from "@material-ui/icons/VpnKey";

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
    name: "Admins",
    icon: Admins,
    component: AdminsPage,
    layout: "/admins"
  },
  {
    path: "/",
    name: "Doctors",
    icon: Doctors,
    component: DoctorsPage,
    layout: "/doctors"
  },
  {
    path: "/",
    name: "Nurses",
    icon: Nurses,
    component: NursesPage,
    layout: "/nurses"
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
