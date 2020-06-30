import React, { useState, useEffect } from "react";
import "./appointmentRequests.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  fetchAppointmentRequests,
  denyAppointmentRequest,
  getProfileInfo,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";
import ChooseDateAlert from "../ChooseDateAlert";

function AppointmentRequestComponent(props) {
  const [list, changeList] = useState([]);

  const [open, openAlert] = useState(false);
  const [ChooseDateAlertOpen, openDateAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);
  const [appointment, ] = useState({});

  useEffect(() => {
    props.dispatch(
      fetchAppointmentRequests(
        JSON.parse(localStorage.getItem("user")).id,
        JSON.parse(localStorage.getItem("user")).token
      )
    );
  }, []);
  useEffect(() => {
    const fetchAppRequests = async () => {
      let result = props.crudUser.fetchAppointmentRequests;
      if (result) {
        if (result.code === "0") {
          for (let i = 0; i < result.data.length; i++) {
            let doctor = await getProfileInfo(
              result.data[i].id_doctor,
              JSON.parse(localStorage.getItem("user")).token
            );
            result.data[i].doctor = doctor.data;
          }
          changeList(result.data);
        }
      }
    };
    fetchAppRequests();
  }, [props.crudUser.fetchAppointmentRequests]);

  useEffect(() => {
    let result = props.crudUser.denyAppointmentRequest;
    if (result) {
      if (result.code === "0") {
        changeAlertText(result.message);
        changeAlertForm(true);
        openAlert(true);
        props.dispatch(
          fetchAppointmentRequests(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
      } else {
        changeAlertText(result.message ? result.message : "Error !");
        changeAlertForm(false);
        openAlert(true);
      }
      props.crudUser.denyAppointmentRequest = null;
    }
  }, [props.crudUser.denyAppointmentRequest]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"md"}>
        <div className={"appointmentRequestsContainer"}>
          <div className={"affectRequestTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Appointment requests</h3>
            <IconButton style={{ marginLeft: "auto" }} onClick={props.close}>
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
          {list.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  {JSON.parse(localStorage.getItem("user")).type == "nurse" && (
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Doctor name
                    </TableCell>
                  )}
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Patient name
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Patient email
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Patient gender
                  </TableCell>
                  <TableCell align="right" />
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    {JSON.parse(localStorage.getItem("user")).type ==
                      "nurse" && (
                      <TableCell align="right">{row.doctor.name}</TableCell>
                    )}
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          (row);
                          openDateAlert(true);
                        }}
                        color={"info"}
                        style={{
                          marginLeft: "auto",
                          marginTop: "20px",
                        }}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          props.dispatch(
                            denyAppointmentRequest(
                              row.id,
                              JSON.parse(localStorage.getItem("user")).type  !==
                                "nurse"
                                ? JSON.parse(localStorage.getItem("user")).id
                                : row.doctor.id,
                              JSON.parse(localStorage.getItem("user")).token
                            )
                          );
                        }}
                        color={"danger"}
                        style={{
                          marginLeft: "auto",
                          marginTop: "20px",
                        }}
                      >
                        Deny
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ fontWeight: "lighter", fontSize: 15, marginTop: 20 }}
              >
                There is no appointment requests for you
              </span>
            </div>
          )}
        </div>
      </Dialog>
      <ResultAlert
        open={open}
        close={() => {
          openAlert(false);
        }}
        text={alertText}
        success={success}
      />
      <ChooseDateAlert
        open={ChooseDateAlertOpen}
        appointment={appointment}
        close={() => {
          openDateAlert(false);
        }}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
  };
}

export default connect(mapStateToProps)(AppointmentRequestComponent);
