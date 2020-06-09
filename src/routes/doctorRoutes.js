
import DashboardPage from "../views/dashboardPages/Dashboard";
import NursesPage from "../views/dashboardPages/Nurses";
import ProfilePage from "../views/dashboardPages/Profile/DoctorProfile";
import PatientsPage from "../views/dashboardPages/Patients";
import AppontmentsPage from "../views/dashboardPages/Appointments";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Patients from "@material-ui/icons/Favorite";
import Nurses from "@material-ui/icons/LocalHospital";
import Appointment from "@material-ui/icons/EventNote";

const dashboardRoutes = [
  {
    path: "/",
    name: "Profile",
    icon: Person,
    component: ProfilePage,
    layout: "/profile"
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
    name: "My Patients",
    icon: Patients,
    component: PatientsPage,
    layout: "/patients"
  },
  {
    path: "/",
    name: "Appointments",
    icon: Appointment,
    component: AppontmentsPage,
    layout: "/appointments"
  }
];

export default dashboardRoutes;
