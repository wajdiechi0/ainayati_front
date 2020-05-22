import React, { useState, useEffect } from "react";
import "./doctorAffectRequests.css";
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
  denyAffectRequestDoctorNurse,
  acceptAffectRequestDoctorNurse,
  fetchAffectRequestsDoctorNurse,
  fetchAffectRequests,
  acceptAffectRequest,
  denyAffectRequest,
  fetchNurseList,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";

function AffectRequestComponent(props) {
  const [list, changeList] = useState([]);

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  useEffect(() => {
    props.type === "nurse"
      ? props.dispatch(
          fetchAffectRequestsDoctorNurse(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        )
      : props.dispatch(
          fetchAffectRequests(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
  }, []);
  useEffect(() => {
    let result = props.crudUser.fetchAffectRequests;
    if (result) {
      if (result.code === "0") {
        changeList(result.data);
      }
    }
  }, [props.crudUser.fetchAffectRequests]);

  useEffect(() => {
    let result = props.crudUser.acceptAffectRequest;
    if (result) {
      if (result.code === "0") {
        changeAlertText(result.message);
        changeAlertForm(true);
        openAlert(true);
        props.dispatch(
          fetchAffectRequestsDoctorNurse(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
        props.dispatch(
          fetchNurseList(JSON.parse(localStorage.getItem("user")).token)
        );
      } else {
        changeAlertText(result.message ? result.message : "Error !");
        changeAlertForm(false);
        openAlert(true);
      }
      props.crudUser.acceptAffectRequestDoctorNurse = null;
    }
  }, [props.crudUser.acceptAffectRequest]);

  useEffect(() => {
    let result = props.crudUser.denyAffectRequest;
    if (result) {
      if (result.code === "0") {
        changeAlertText(result.message);
        changeAlertForm(true);
        openAlert(true);
        props.dispatch(
          fetchAffectRequestsDoctorNurse(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
      } else {
        changeAlertText(result.message ? result.message : "Error !");
        changeAlertForm(false);
        openAlert(true);
      }
      props.crudUser.denyAffectRequest = null;
    }
  }, [props.crudUser.denyAffectRequest]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"md"}>
        <div className={"affectRequestsContainer"}>
          <div className={"affectRequestTitle"}>
            <h3 style={{ marginLeft: "auto" }}>
              {props.type === "patient" ? "Patient" : "Nurse"} affect requests
            </h3>
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
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Id
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Birthdate
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Home address
                  </TableCell>
                  {props.type === "patient" && (
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Gender
                    </TableCell>
                  )}
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
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.birthdate}</TableCell>
                    <TableCell align="right">{row.home_address}</TableCell>
                    {props.type === "patient" && (
                      <TableCell align="right">{row.gender}</TableCell>
                    )}
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          props.type === "nurse"
                            ? props.dispatch(
                                acceptAffectRequestDoctorNurse(
                                  row.id,
                                  JSON.parse(localStorage.getItem("user")).id,
                                  JSON.parse(localStorage.getItem("user")).token
                                )
                              )
                            : props.dispatch(
                                acceptAffectRequest(
                                  row.id,
                                  JSON.parse(localStorage.getItem("user")).id,
                                  JSON.parse(localStorage.getItem("user")).token
                                )
                              );
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
                          props.type === "nurse"
                            ? props.dispatch(
                                denyAffectRequestDoctorNurse(
                                  row.id,
                                  JSON.parse(localStorage.getItem("user")).id,
                                  JSON.parse(localStorage.getItem("user")).token
                                )
                              )
                            : props.dispatch(
                                denyAffectRequest(
                                  row.id,
                                  JSON.parse(localStorage.getItem("user")).id,
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
                There is no affect requests for you
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
  };
}

export default connect(mapStateToProps)(AffectRequestComponent);
