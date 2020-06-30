import React, { useState, useEffect } from "react";
import "./patientAppointments.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import AppointmentDone from "@material-ui/icons/EventAvailable";
import AppointmentNotDone from "@material-ui/icons/History";
import Close from "@material-ui/icons/Close";
import { Pagination } from "@material-ui/lab";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

import {
  fetchDoctorAppointments,
  getProfileInfo,
} from "../../../../redux/actions";
function PatientAppointmentsComponent(props) {
  const [appointments, changeAppointments] = useState([]);
  const [selectedAppointments, changeSelectedAppointments] = useState([]);
  const [fetch, changeFetch] = useState(false);

  const range = 5;
  useEffect(() => {
    const fetchData = async () => {
      let result = props.blockchainReducer.appointmentList;
      if (result && props.patient) {
        result.sort(function (a, b) {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
        result = result.filter((val) => {
          return (
            val.patient ==
            "resource:org.acme.ainayati.Patient#" + props.patient.id
          );
        });
        for (let i = 0; i < result.slice(0, range).length; i++) {
          let doctor = await getProfileInfo(
            result.slice(0, range)[i].doctor.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          result.slice(0, range)[i].doctorUser = doctor.data;
          let patient = await getProfileInfo(
            result.slice(0, range)[i].patient.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          result.slice(0, range)[i].patientUser = patient.data;
        }
        changeSelectedAppointments(result.slice(0, range));
        changeAppointments(result);
        changeFetch(true);

        props.blockchainReducer.appointmentList = null;
      }
    };
    fetchData();
  }, [props.blockchainReducer.appointmentList, props.patient]);

  const handlePageChange = (pageNumber) => {
    changeFetch(false);
    const fetchData = async () => {
      for (
        let i = 0;
        i <
        appointments.slice((pageNumber - 1) * range, pageNumber * range).length;
        i++
      ) {
        let doctor = await getProfileInfo(
          appointments
            .slice((pageNumber - 1) * range, pageNumber * range)
            [i].doctor.split("#")[1],
          JSON.parse(localStorage.getItem("user")).token
        );
        appointments.slice((pageNumber - 1) * range, pageNumber * range)[
          i
        ].doctorUser = doctor.data;
        let patient = await getProfileInfo(
          appointments
            .slice((pageNumber - 1) * range, pageNumber * range)
            [i].patient.split("#")[1],
          JSON.parse(localStorage.getItem("user")).token
        );
        appointments.slice((pageNumber - 1) * range, pageNumber * range)[
          i
        ].patientUser = patient.data;
      }
      changeSelectedAppointments(
        appointments.slice((pageNumber - 1) * range, pageNumber * range)
      );
      changeFetch(true);
    };
    fetchData();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          changeAppointments([]);
          changeSelectedAppointments([]);
          props.close();
        }}
        onEnter={() => {
          props.dispatch(
            fetchDoctorAppointments(JSON.parse(localStorage.getItem("user")).id)
          );
        }}
        maxWidth={"lg"}
      >
        <div className={"patientAppsContainer"}>
          <div className={"patientAppsTitle"}>
            <h3 style={{ marginLeft: "auto" }}>
              {props.patient && props.patient.name} appointments
            </h3>
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => {
                changeAppointments([]);
                changeSelectedAppointments([]);
                props.close();
              }}
            >
              <Close />
            </IconButton>
          </div>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              width: "100%",
              height: 1,
              opacity: 0.5,
            }}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Patient email
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Appointment state
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Appointment date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Appointment details
                </TableCell>
              </TableRow>
            </TableHead>
            {fetch && (
              <TableBody>
                {selectedAppointments.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell> {row.patientUser.email}</TableCell>
                    <TableCell>
                      {row.state === "false" ? (
                        <Tooltip title="Not done">
                          <AppointmentNotDone />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Done">
                          <AppointmentDone style={{ color: "green" }} />
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          <Pagination
            count={
              appointments.length <= range
                ? 1
                : Math.ceil(appointments.length / range)
            }
            color="primary"
            style={{ position: "absolute", bottom: 10, left: 5 }}
            onChange={(e, p) => handlePageChange(p)}
          />
        </div>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blockchainReducer: state.blockchainReducer,
  };
}

export default connect(mapStateToProps)(PatientAppointmentsComponent);
