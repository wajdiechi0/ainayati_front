import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Update from "@material-ui/icons/Update";
import "./dashboard.css";
// core components
import GridItem from "./../../../dashboard/components/Grid/GridItem.js";
import GridContainer from "./../../../dashboard/components/Grid/GridContainer.js";
import Card from "./../../../dashboard/components/Card/Card.js";
import CardHeader from "./../../../dashboard/components/Card/CardHeader.js";
import CardIcon from "./../../../dashboard/components/Card/CardIcon.js";
import CardFooter from "./../../../dashboard/components/Card/CardFooter.js";
import CardBody from "./../../../dashboard/components/Card/CardBody.js";
import { connect } from "react-redux";
import DoctorsIcon from "@material-ui/icons/AssignmentInd";
import PatientsIcon from "@material-ui/icons/Favorite";
import NursesIcon from "@material-ui/icons/LocalHospital";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import AdminsIcon from "@material-ui/icons/VpnKey";
import { userRegistrations } from "./../../../variables/charts.js";
import {
  fetchDoctorList,
  fetchAdminList,
  fetchNurseList,
  fetchPatientList,
  getLast24HoursAdmins,
  getLast24HoursDoctors,
  getLast24HoursNurses,
  getLast24HoursPatients,
  doctorRegistrationsPerMonth,
  nurseRegistrationsPerMonth,
  patientRegistrationsPerMonth,
} from "./../../../redux/actions";
import styles from "./../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  const [doctors, changeDoctors] = useState("");
  const [adminsN, changeAdminsN] = useState("");
  const [nurses, changeNurses] = useState("");
  const [patients, changePatients] = useState("");
  const [doctorsN24h, changeDoctorsN24h] = useState("");
  const [adminsN24h, changeAdminsN24h] = useState("");
  const [nursesN24h, changeNursesN24h] = useState("");
  const [patientsN24h, changePatientsN24h] = useState("");
  const [doctorsPerMonth, changeDoctorRegistrationsPerMonth] = useState([]);
  const [patientsPerMonth, changePatientRegistrationsPerMonth] = useState([]);
  const [nursesPerMonth, changeNurseRegistrationsPerMonth] = useState([]);

  const doctorRegistrations = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [doctorsPerMonth],
  };

  const nurseRegistrations = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [nursesPerMonth],
  };

  const patientRegistrations = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [patientsPerMonth],
  };
  useEffect(() => {
    let result = props.crudUser.doctorList;
    if (result) {
      if (result.code === "0") {
        changeDoctors(result.data);
      }
      props.crudUser.doctorList = null;
    }
    result = props.crudUser.nurseList;
    if (result) {
      if (result.code === "0") {
        changeNurses(result.data);
      }
      props.crudUser.nurseList = null;
    }
    result = props.crudUser.patientList;
    if (result) {
      if (result.code === "0") {
        changePatients(result.data);
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
    result = props.crudUser.doctorRegistrationsPerMonth;
    if (result) {
      if (result.code === "0") {
        changeDoctorRegistrationsPerMonth(result.data);
      }
      props.crudUser.doctorRegistrationsPerMonth = null;
    }
    result = props.crudUser.nurseRegistrationsPerMonth;
    if (result) {
      if (result.code === "0") {
        console.log(result.data);
        changeNurseRegistrationsPerMonth(result.data);
      }
      props.crudUser.nurseRegistrationsPerMonth = null;
    }
    result = props.crudUser.patientRegistrationsPerMonth;
    if (result) {
      if (result.code === "0") {
        changePatientRegistrationsPerMonth(result.data);
      }
      props.crudUser.patientRegistrationsPerMonth = null;
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
    props.crudUser.doctorRegistrationsPerMonth,
    props.crudUser.nurseRegistrationsPerMonth,
    props.crudUser.patientRegistrationsPerMonth,
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
    props.dispatch(
      doctorRegistrationsPerMonth(
        JSON.parse(localStorage.getItem("user")).token
      )
    );
    props.dispatch(
      nurseRegistrationsPerMonth(JSON.parse(localStorage.getItem("user")).token)
    );
    props.dispatch(
      patientRegistrationsPerMonth(
        JSON.parse(localStorage.getItem("user")).token
      )
    );
  }, []);
  return (
    <div>
      <GridContainer>
        {JSON.parse(localStorage.getItem("user")).type === "super admin" && (
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
        )}
        <GridItem xs={JSON.parse(localStorage.getItem("user")).type === "super admin"? 3:4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <DoctorsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Doctors</p>
              <h3 className={classes.cardTitle}>{doctors.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{doctorsN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={JSON.parse(localStorage.getItem("user")).type === "super admin"? 3:4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <NursesIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nurses</p>
              <h3 className={classes.cardTitle}>{nurses.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last 24 hours : +{nursesN24h}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={JSON.parse(localStorage.getItem("user")).type === "super admin"? 3:4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PatientsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Patients</p>
              <h3 className={classes.cardTitle}>{patients.length}</h3>
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
      <GridContainer>
        <GridItem xs={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={doctorRegistrations}
                type="Line"
                options={userRegistrations.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Doctor registrations</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={nurseRegistrations}
                type="Line"
                options={userRegistrations.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Nurse registrations</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={patientRegistrations}
                type="Line"
                options={userRegistrations.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Patient registrations</h4>
            </CardBody>
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
