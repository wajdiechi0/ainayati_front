import React, { useState, useEffect } from "react";
import "./chooseDateAlert.css";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import {
  acceptAppointmentRequest,
  fetchAppointmentRequests,
  removeAppointmentRequest,
} from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";

function AffectRequestComponent(props) {
  const [appDate, changeAppDate] = useState("");
  const [open, changeOpen] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeSuccess] = useState(false);
  const [disabled, changeDisabled] = useState(true);

  useEffect(() => {
    if (props.blockchain.acceptAppointmentRequest) {
      if (props.blockchain.acceptAppointmentRequest.status === 200) {
        changeOpen(true);
        changeSuccess(true);
        changeAlertText("You have accepted an appointment request");
        props.dispatch(
          removeAppointmentRequest(
            props.appointment.id,

            JSON.parse(localStorage.getItem("user")).type !== "nurse"
              ? JSON.parse(localStorage.getItem("user")).id
              : props.appointment.doctor.id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
        props.dispatch(
          fetchAppointmentRequests(
            JSON.parse(localStorage.getItem("user")).id,
            JSON.parse(localStorage.getItem("user")).token
          )
        );
        props.close();
        changeDisabled(true);
      } else {
        changeOpen(true);
        changeSuccess(false);
        changeAlertText("Error !");
        changeDisabled(false);
      }
      props.blockchain.acceptAppointmentRequest = null;
    }
  }, [props.blockchain.acceptAppointmentRequest]);

  const addApp = () => {
    changeDisabled(true);
    props.dispatch(
      acceptAppointmentRequest(
        JSON.parse(localStorage.getItem("user")).type === "doctor"
          ? JSON.parse(localStorage.getItem("user")).id
          : props.appointment.doctor.id,
        props.appointment.id,
        appDate,
        " "
      )
    );
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div className={"chooseDateContainer"}>
          <div className={"doctorsTxTitle"}>
            <h3 style={{ marginLeft: "auto" }}>
              Choose a date for the appointment
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="dense"
              label={"Date"}
              type="datetime-local"
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ width: "60%" }}
              required={true}
              onChange={(e) => {
                changeAppDate(e.target.value.replace("T", " "));
                changeDisabled(e.target.value !== "" ? false : true);
              }}
            />

            <Button
              onClick={addApp}
              color={"primary"}
              disabled={disabled}
              style={{
                marginTop: "30px",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Dialog>

      <ResultAlert
        open={open}
        close={() => {
          changeOpen(false);
        }}
        text={alertText}
        success={success}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blockchain: state.blockchainReducer,
  };
}

export default connect(mapStateToProps)(AffectRequestComponent);
