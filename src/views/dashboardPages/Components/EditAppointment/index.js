import React, { useState, useEffect } from "react";
import "./editAppointment.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import {
  editAppointment,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
class EditAppointmentComponent extends React.Component {
  state = {
    open: false,
    alertText: "",
    disabled: false,
    success: true,
    appDate: "",
    appDetails: "",
    appState: "",
  };
  editApp = async () => {
    if (this.state.appDate === "") {
      this.setState({
        open: true,
        alertText: "Please check the appointment date",
        success: false,
      });
    } else {
      if (this.state.appDetails === "") {
        this.state.appDetails = " ";
      }
      this.state.appDate = this.state.appDate.replace("T", " ");
      this.setState({ disabled: true });
      this.props.dispatch(
        editAppointment(
          this.props.appointment.id,
          this.props.appointment.doctorUser.id,
          this.props.appointment.patientUser.id,
          this.state.appState,
          this.state.appDetails,
          this.state.appDate
        )
      );
    }
  };
  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.close}>
          <div className={"editAppContainer"}>
            <div className={"affectRequestTitle"}>
              <h3 style={{ marginLeft: "auto" }}>
                Appointment ID#{this.props.appointment.id}
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
            <div className={"textfieldCont"}>
              <span className={"formText"}>Patient name</span>
              <TextField
                margin="dense"
                label={"name"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={
                  this.props.appointment.patient
                    ? this.props.appointment.patientUser.name
                    : ""
                }
                disabled
              />
            </div>
            <div className={"textfieldCont"}>
              <span className={"formText"}>Patient email</span>
              <TextField
                margin="dense"
                label={"Email"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={
                  this.props.appointment.patient
                    ? this.props.appointment.patientUser.email
                    : ""
                }
                disabled
              />
            </div>
            <div className={"textfieldCont"}>
              <span className={"formText"}>Appointment date</span>
              <TextField
                margin="dense"
                label={"Date"}
                type="datetime-local"
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                disabled={
                  JSON.parse(localStorage.getItem("user")).type === "patient"
                    ? true
                    : false
                }
                defaultValue={
                  this.props.appointment.date
                    ? this.props.appointment.date.replace(" ", "T")
                    : ""
                }
                onChange={(e) => {
                  this.setState({ appDate: e.target.value });
                }}
              />
            </div>
            <div
              className={"textfieldCont"}
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              <span className={"formText"}>Appointment state</span>
              <FormControl
                style={{
                  marginRight: 50,
                  marginLeft: "30px",
                  width: "60%",
                }}
              >
                <InputLabel>State</InputLabel>
                <Select
                  defaultValue={this.props.appointment.state}
                  onChange={(e) => this.setState({ appState: e.target.value })}
                  disabled={
                    JSON.parse(localStorage.getItem("user")).type === "patient"
                      ? true
                      : false
                  }
                >
                  <MenuItem value={"false"}>Scheduled</MenuItem>
                  <MenuItem value={"true"}>Done</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={"textfieldCont"}>
              <span className={"formText"}>Appointment details</span>
              <TextField
                margin="dense"
                label={"Details"}
                multiline
                rows="4"
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={this.props.appointment.details}
                onChange={(e) => {
                  this.setState({ appDetails: e.target.value });
                }}
                disabled={
                  JSON.parse(localStorage.getItem("user")).type === "patient"
                    ? true
                    : false
                }
              />
            </div>

            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            >
              <Button
                onClick={this.editApp}
                color={"primary"}
                disabled={this.state.disabled}
                style={{
                  marginLeft: "auto",
                  marginRight: "50px",
                  marginTop: "10px",
                  display:
                    JSON.parse(localStorage.getItem("user")).type === "patient"
                      ? "none"
                      : "block",
                }}
              >
                Update Appointment
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
    if (prevProps.appointment !== this.props.appointment) {
      this.setState({
        appDate: this.props.appointment.date,
        appDetails: this.props.appointment.details,
        appState: this.props.appointment.state,
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

export default connect(mapStateToProps)(EditAppointmentComponent);
