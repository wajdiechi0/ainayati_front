import React, { useState, useEffect } from "react";
import "./sendAffectRequest.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  sendAffectRequest,
  sendAffectRequestDoctorNurse,
  fetchDoctorListBySpecialty,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";

function AffectRequestComponent(props) {
  const [specialty, changeSpecialty] = useState("");
  const [list, changeList] = useState([]);

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  useEffect(() => {
    let result = props.crudUser.doctorListBySpecialty;
    if (result) {
      if (result.code === "0") {
        changeList(result.data);
      }
    }
  }, [props.crudUser.doctorListBySpecialty, props]);

  useEffect(() => {
    let result = props.crudUser.sendAffectRequest;
    if (result) {
      if (result.code === "0") {
        changeAlertText(result.message);
        changeAlertForm(true);
        openAlert(true);
      } else {
        changeAlertText(result.message ? result.message : "Error !");
        changeAlertForm(false);
        openAlert(true);
      }
    }
  }, [props.crudUser.sendAffectRequest]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"md"}>
        <div className={"affectRequestContainer"}>
          <div className={"affectRequestTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Search for a doctor</h3>
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
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}
          >
            <TextField
              margin="dense"
              label={"Specialty"}
              variant={"outlined"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginTop: 20, width: "30%" }}
              required={true}
              onChange={(e) => {
                changeSpecialty(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                props.dispatch(
                  fetchDoctorListBySpecialty(
                    specialty,
                    JSON.parse(localStorage.getItem("user")).token
                  )
                );
              }}
              color={"primary"}
              style={{
                marginLeft: "auto",
                marginTop: "20px",
              }}
            >
              Search by Specialty
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Work Address
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Specialty
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Gender
                </TableCell>
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
                  <TableCell align="right">{row.work_address}</TableCell>
                  <TableCell align="right">{row.specialty}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        props.type === "nurse"
                          ? props.dispatch(
                              sendAffectRequestDoctorNurse(
                                row.id,
                                JSON.parse(localStorage.getItem("user")).id,
                                JSON.parse(localStorage.getItem("user")).token
                              )
                            )
                          : props.dispatch(
                              sendAffectRequest(
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
                      Send Affect Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
