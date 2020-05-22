
import DashboardPage from "../views/dashboardPages/Dashboard";
import ProfilePage from "../views/dashboardPages/Profile/NurseProfile";
import DoctorsPage from "../views/dashboardPages/Doctors";
import PatientsPage from "../views/dashboardPages/Patients";
import AppontmentsPage from "../views/dashboardPages/Appointments";
import Doctors from "@material-ui/icons/AssignmentInd";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Patients from "@material-ui/icons/Favorite";
import Appointment from "@material-ui/icons/EventNote";

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
  },
  {
    path: "",
    name: "My Doctors",
    icon: Doctors,
    component: DoctorsPage,
    layout: "/doctors"
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
