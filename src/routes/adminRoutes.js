
import DashboardPage from "../views/dashboardPages/Dashboard";
import DoctorsPage from "../views/dashboardPages/Doctors";
import NursesPage from "../views/dashboardPages/Nurses";
import AdminProfilePage from "../views/dashboardPages/Profile/AdminProfile";
import PatientsPage from "../views/dashboardPages/Patients";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Doctors from "@material-ui/icons/AssignmentInd";
import Patients from "@material-ui/icons/Favorite";
import Nurses from "@material-ui/icons/LocalHospital";

const dashboardRoutes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: Person,
    component: AdminProfilePage,
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
