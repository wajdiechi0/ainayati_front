import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../dashboard/components/Navbars/Navbar.js";
import Sidebar from "../dashboard/components/Sidebar/Sidebar.js";

import superadminRoutes from "../routes/superadminRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import doctorRoutes from "../routes/doctorRoutes.js";
import nurseRoutes from "../routes/nurseRoutes.js";
import patientRoutes from "../routes/patientRoutes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "./../assets/img/sidebar-2.jpg";
import logo from "./../assets/logo/logoWithNoText.png";

const useStyles = makeStyles(styles);
export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  let routes=[];
  switch(JSON.parse(localStorage.getItem("user")).type){
    case "super admin": routes = superadminRoutes;break;
    case "admin": routes = adminRoutes;break;
    case "doctor": routes = doctorRoutes;break;
    case "nurse": routes = nurseRoutes;break;
    case "patient": routes = patientRoutes;break;
    default:break;
  }
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      ))}
      <Redirect from="/dashboard" to={"/dashboard" + routes[0].path} />
    </Switch>
  );
  return (
    <div>
      <Sidebar
        routes={routes}
        logoText={"Ainayati"}
        logo={logo}
        image={bgImage}
        color={"purple2"}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar routes={routes} {...rest} />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
