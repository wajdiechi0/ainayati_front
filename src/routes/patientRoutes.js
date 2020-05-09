
import DashboardPage from "../views/dashboardPages/Dashboard";
import DoctorsPage from "../views/dashboardPages/Doctors";
import ProfilePage from "../views/dashboardPages/Profile/PatientProfile";
import Doctors from "@material-ui/icons/AssignmentInd";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";


const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "",
    name: "Profile",
    icon: Person,
    component: ProfilePage,
    layout: "/profile"
  },
  {
    path: "",
    name: "My Doctors",
    icon: Doctors,
    component: DoctorsPage,
    layout: "/doctors"
  }
];

export default dashboardRoutes;
