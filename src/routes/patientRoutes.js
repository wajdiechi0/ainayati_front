
import DashboardPage from "../views/dashboardPages/Dashboard";
import DoctorsPage from "../views/dashboardPages/Doctors";
import ProfilePage from "../views/dashboardPages/Profile/PatientProfile";
import Doctors from "@material-ui/icons/AssignmentInd";
import AppontmentsPage from "../views/dashboardPages/Appointments";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Appointment from "@material-ui/icons/EventNote";


const dashboardRoutes = [
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
  },
  {
    path: "/",
    name: "My Appointments",
    icon: Appointment,
    component: AppontmentsPage,
    layout: "/appointments"
  }
];

export default dashboardRoutes;
