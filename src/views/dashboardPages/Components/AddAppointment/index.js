import React, { useState, useEffect } from "react";
import "./addAppointment.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  fetchDoctorAppointments,
  getProfileInfoUsingEmail,
  addAppointment,
  checkAffectDoctorPatient,
  sendAppointmentRequest,
  fetchNurseAppointments,
  checkAffectDoctorNurse,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
class AddAppointmentComponent extends React.Component {
  state = {
    open: false,
    alertText: "",
    disabled: false,
    success: true,
    patients: [],
    selected: {},
    appDate: "",
    appDetails: " ",
    email: "",
    doctorEmail: "",
  };
  addApp = async () => {
    this.setState({ disabled: true });
    if (
      this.state.appDate === "" &&
      JSON.parse(localStorage.getItem("user")).type !== "patient"
    ) {
      this.setState({
        open: true,
        alertText: "Please check the appointment date ",
        disabled: false,
        success: false,
      });
    } else {
      var validator = require("email-validator");
      if (!validator.validate(this.state.email)) {
        this.setState({
          disabled: false,
          open: true,
          alertText: "Please check patient email ",
          success: false,
        });
      } else if (
        !validator.validate(this.state.doctorEmail) &&
        JSON.parse(localStorage.getItem("user")).type === "nurse"
      ) {
        this.setState({
          disabled: false,
          open: true,
          alertText: "Please check doctor email ",
          success: false,
        });
      } else {
        if (this.state.appDetails === "") {
          this.state.appDetails = " ";
        }
        let patient = await getProfileInfoUsingEmail(
          this.state.email,
          JSON.parse(localStorage.getItem("user")).token
        );
        if (patient.code !== "0") {
          this.setState({
            open: true,
            disabled: false,
            alertText: "Patient not found",
            success: false,
          });
        } else {
          if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
            let doctor = await getProfileInfoUsingEmail(
              this.state.doctorEmail,
              JSON.parse(localStorage.getItem("user")).token
            );
            if (doctor.code !== "0") {
              this.setState({
                open: true,
                disabled: false,
                alertText: "Doctor not found",
                success: false,
              });
            } else {
              let affected = await checkAffectDoctorNurse(
                JSON.parse(localStorage.getItem("user")).id,
                doctor.data.id,
                JSON.parse(localStorage.getItem("user")).token
              );
              if (!affected.data) {
                this.setState({
                  open: true,
                  disabled: false,
                  alertText: "You are not affected to this doctor",
                  success: false,
                });
                console.log(affected.data);
              } else {
                affected = await checkAffectDoctorPatient(
                  patient.data.id,
                  doctor.data.id,
                  JSON.parse(localStorage.getItem("user")).token
                );
                if (!affected.data) {
                  this.setState({
                    open: true,
                    disabled: false,
                    alertText: "The doctor is not affected to the patient",
                    success: false,
                  });
                } else {
                  this.state.appDate = this.state.appDate.replace("T", " ");
                  this.props.dispatch(
                    addAppointment(
                      doctor.data.id,
                      patient.data.id,
                      this.state.appDate,
                      this.state.appDetails
                    )
                  );
                }
              }
            }
          } else {
            let affected = await checkAffectDoctorPatient(
              JSON.parse(localStorage.getItem("user")).type !== "patient"
                ? patient.data.id
                : JSON.parse(localStorage.getItem("user")).id,
              JSON.parse(localStorage.getItem("user")).type === "patient"
                ? patient.data.id
                : JSON.parse(localStorage.getItem("user")).id,
              JSON.parse(localStorage.getItem("user")).token
            );
            if (!affected.data) {
              this.setState({
                open: true,
                disabled: false,
                alertText:
                  JSON.parse(localStorage.getItem("user")).type === "patient"
                    ? "You are not affected to this doctor"
                    : "You are not affected to this patient",
                success: false,
              });
            } else {
              this.state.appDate = this.state.appDate.replace("T", " ");
              if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
                this.props.dispatch(
                  addAppointment(
                    JSON.parse(localStorage.getItem("user")).id,
                    patient.data.id,
                    this.state.appDate,
                    this.state.appDetails
                  )
                );
              } else {
                this.props.dispatch(
                  sendAppointmentRequest(
                    patient.data.id,
                    JSON.parse(localStorage.getItem("user")).id,
                    JSON.parse(localStorage.getItem("user")).token
                  )
                );
              }
            }
          }
        }
      }
    }
  };
  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.close}>
          <div className={"addAppContainer"}>
            <div className={"affectRequestTitle"}>
              <h3 style={{ marginLeft: "auto" }}>
                {" "}
                {JSON.parse(localStorage.getItem("user")).type === "patient"
                  ? "Send appointment request"
                  : "Add an appointment"}
              </h3>
              <IconButton
                style={{ marginLeft: "auto" }}
                onClick={this.props.close}
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
            {JSON.parse(localStorage.getItem("user")).type === "nurse" && (
              <div className={"textfieldCont"}>
                <span className={"formText"}>Doctor email</span>
                <TextField
                  margin="dense"
                  label={"Doctor email"}
                  InputLabelProps={{
                    style: { fontSize: ".9em" },
                    shrink: true,
                  }}
                  inputProps={{ style: { fontSize: ".9em" } }}
                  style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                  required={true}
                  disabled={this.props.addAppointmentPatient ? true : false}
                  onChange={(e) => {
                    this.setState({ doctorEmail: e.target.value });
                  }}
                />
              </div>
            )}
            <div className={"textfieldCont"}>
              <span className={"formText"}>
                {JSON.parse(localStorage.getItem("user")).type === "patient"
                  ? "Doctor email"
                  : "Patient email"}
              </span>
              <TextField
                margin="dense"
                label={"Patient email"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                disabled={this.props.addAppointmentPatient ? true : false}
                defaultValue={
                  this.props.addAppointmentPatient &&
                  this.props.addAppointmentPatient.email
                }
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div
              className={"textfieldCont"}
              style={{
                display:
                  JSON.parse(localStorage.getItem("user")).type === "patient"
                    ? "none"
                    : "flex",
              }}
            >
              <span className={"formText"}>Appointment date</span>
              <TextField
                margin="dense"
                label={"Date"}
                type="datetime-local"
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={(e) => {
                  this.setState({ appDate: e.target.value });
                }}
              />
            </div>
            <div
              className={"textfieldCont"}
              style={{
                display:
                  JSON.parse(localStorage.getItem("user")).type === "patient"
                    ? "none"
                    : "flex",
              }}
            >
              <span className={"formText"}>Appointment details</span>
              <TextField
                margin="dense"
                label={"Details"}
                multiline
                rows="4"
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                onChange={(e) => {
                  this.setState({ appDetails: e.target.value });
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            >
              <Button
                onClick={this.addApp}
                color={"primary"}
                disabled={this.state.disabled}
                style={{
                  marginLeft: "auto",
                  marginRight: "50px",
                  marginTop: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
        <ResultAlert
          open={this.state.open}
          close={() => {
            this.setState({
              open: false,
            });
          }}
          text={this.state.alertText}
          success={this.state.success}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.crudUser.sendAppointmentRequest &&
      prevProps !== this.props
    ) {
      let result = this.props.crudUser.sendAppointmentRequest;
      if (result) {
        if (result.code === "0") {
          this.setState({
            open: true,
            disabled: false,
            alertText: result.message,
            success: true,
          });
        } else {
          this.setState({
            open: true,
            disabled: false,
            alertText: result.message,
            success: false,
          });
        }
      }
      this.props.crudUser.sendAppointmentRequest = null;
    }

    if (this.props.blockchain.addAppointment && prevProps !== this.props) {
      if (this.props.blockchain.addAppointment.status === 200) {
        this.setState({
          open: true,
          alertText:
            JSON.parse(localStorage.getItem("user")).type === "patient"
              ? "Appointment request has been successfully sent"
              : "A new appointment has been successfully added",
          success: true,
          disabled: false,
        });
        if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
          this.props.dispatch(
            fetchDoctorAppointments(JSON.parse(localStorage.getItem("user")).id)
          );
        } else if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
          this.props.dispatch(fetchNurseAppointments(this.props.patients));
        }
      }
      this.props.blockchain.addAppointment = null;
    }

    if (prevProps.addAppointmentPatient !== this.props.addAppointmentPatient) {
      this.setState({
        email: this.props.addAppointmentPatient.email,
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
    blockchain: state.blockchainReducer,
  };
}

export default connect(mapStateToProps)(AddAppointmentComponent);
