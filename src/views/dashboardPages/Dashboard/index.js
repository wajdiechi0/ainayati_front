import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "./../../../dashboard/components/Grid/GridItem.js";
import GridContainer from "./../../../dashboard/components/Grid/GridContainer.js";
import Card from "./../../../dashboard/components/Card/Card.js";
import CardHeader from "./../../../dashboard/components/Card/CardHeader.js";
import CardIcon from "./../../../dashboard/components/Card/CardIcon.js";
import CardFooter from "./../../../dashboard/components/Card/CardFooter.js";
import { connect } from "react-redux";
import DoctorsIcon from "@material-ui/icons/AssignmentInd";
import PatientsIcon from "@material-ui/icons/Favorite";
import NursesIcon from "@material-ui/icons/LocalHospital";
import AdminsIcon from "@material-ui/icons/VpnKey";

import {
  fetchDoctorList,
  fetchAdminList,
  fetchNurseList,
  fetchPatientList,
  getLast24HoursAdmins,
  getLast24HoursDoctors,
  getLast24HoursNurses,
  getLast24HoursPatients,
} from "./../../../redux/actions";
import styles from "./../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  const [doctorsN, changeDoctorsN] = useState("");
  const [adminsN, changeAdminsN] = useState("");
  const [nursesN, changeNursesN] = useState("");
  const [patientsN, changePatientsN] = useState("");
  const [doctorsN24h, changeDoctorsN24h] = useState("");
  const [adminsN24h, changeAdminsN24h] = useState("");
  const [nursesN24h, changeNursesN24h] = useState("");
  const [patientsN24h, changePatientsN24h] = useState("");

  useEffect(() => {
    let result = props.crudUser.doctorList;
    if (result) {
      if (result.code === "0") {
        changeDoctorsN(result.data.length);
      }
      props.crudUser.doctorList = null;
    }
    result = props.crudUser.nurseList;
    if (result) {
      if (result.code === "0") {
        changeNursesN(result.data.length);
      }
      props.crudUser.nurseList = null;
    }
    result = props.crudUser.patientList;
    if (result) {
      if (result.code === "0") {
        changePatientsN(result.data.length);
      }
      props.crudUser.patientList = null;
    }
    result = props.crudUser.adminList;
    if (result) {
      if (result.code === "0") {
        changeAdminsN(result.data.length);
      }
      props.crudUser.adminList = null;
    }
    result = props.crudUser.last24HoursAdmins;
    if (result) {
      if (result.code === "0") {
        changeAdminsN24h(result.data.length);
      }
      props.crudUser.last24HoursAdmins = null;
    }
    result = props.crudUser.last24HoursDoctors;
    if (result) {
      if (result.code === "0") {
        changeDoctorsN24h(result.data.length);
      }
      props.crudUser.last24HoursDoctors = null;
    }
    result = props.crudUser.last24HoursNurses;
    if (result) {
      if (result.code === "0") {
        changeNursesN24h(result.data.length);
      }
      props.crudUser.last24HoursNurses = null;
    }
    result = props.crudUser.last24HoursPatients;
    if (result) {
      if (result.code === "0") {
        changePatientsN24h(result.data.length);
      }
      props.crudUser.last24HoursPatients = null;
    }
  }, [
    props.crudUser.adminList,
    props.crudUser.doctorList,
    props.crudUser.nurseList,
    props.crudUser.patientList,
    props.crudUser.last24HoursAdmins,
    props.crudUser.last24HoursDoctors,
    props.crudUser.last24HoursNurses,
    props.crudUser.last24HoursPatients,
  ]);

  useEffect(() => {
    document.title = "Dashboard";
    props.dispatch(
      fetchDoctorList(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      fetchNurseList(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      fetchPatientList(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      fetchAdminList(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      getLast24HoursAdmins(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      getLast24HoursDoctors(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      getLast24HoursNurses(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      getLast24HoursPatients(JSON.parse(localStorage.getItem("user")).token)
    );

  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AdminsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Admins</p>
              <h3 className={classes.cardTitle}>{adminsN}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{adminsN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={3} >
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <DoctorsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Doctors</p>
              <h3 className={classes.cardTitle}>{doctorsN}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{doctorsN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <NursesIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nurses</p>
              <h3 className={classes.cardTitle}>{nursesN}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{nursesN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PatientsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Patients</p>
              <h3 className={classes.cardTitle}>{patientsN}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{patientsN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
  };
}
export default connect(mapStateToProps)(Dashboard);
