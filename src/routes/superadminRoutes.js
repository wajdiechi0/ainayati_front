
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
    path: "/superadmin",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: Admins,
    component: AdminsPage,
    layout: "/dashboard"
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: Doctors,
    component: DoctorsPage,
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
