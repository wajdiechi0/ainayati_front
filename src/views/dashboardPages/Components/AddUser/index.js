import React, { useState, useEffect } from "react";
import "./addUser.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  addNewUser,
  fetchDoctorList,
  fetchAdminList,
  fetchNurseList,
  fetchPatientList
} from "../../../../redux/actions";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ResultAlert from "../../../authentication/components/alert";

function AddUserComponent(props) {
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [c_password, changeConfirmation] = useState("");
  const [password, changePassword] = useState("");
  const [birthdate, changeBirthdate] = useState("");
  const [homeAddress, changeHomeaddress] = useState("");
  const [workAddress, changeWorkaddress] = useState("");
  const [specialty, changeSpecialty] = useState("");
  const [weight, changeWeight] = useState("");
  const [height, changeHeight] = useState("");
  const [gender, changeGender] = useState("");

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  useEffect(() => {
    let result = props.crudUser.addDoctorResult;
    if (result) {
      changeAlertText(result.message);
      openAlert(true);
      if (result.code !== "0") {
        changeAlertForm(false);
      } else if (result.code === "0") {
        switch (props.type) {
          case "admin":
            props.dispatch(fetchAdminList(JSON.parse(localStorage.getItem("user")).token));
            break;
          case "doctor":
            props.dispatch(fetchDoctorList(JSON.parse(localStorage.getItem("user")).token));
            break;
          case "nurse":
            props.dispatch(fetchNurseList(JSON.parse(localStorage.getItem("user")).token));
            break;
          case "patient":
            props.dispatch(fetchPatientList(JSON.parse(localStorage.getItem("user")).token));
            break;
          default:
            break;
        }
        changeAlertForm(true);
      }
      props.crudUser.addDoctorResult = null;
    }
  }, [props.crudUser.addDoctorResult, props]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div className={"addDoctorContainer"}>
          <div className={"dialogTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Add new {props.type} </h3>
            <IconButton style={{ marginLeft: "auto" }} onClick={props.close}>
              <Close />
            </IconButton>
          </div>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              width: "100%",
              height: 1,
              opacity: 0.5
            }}
          />
          <div className={"textfieldCont"}>
            <span className={"formText"}>Name</span>
            <TextField
              margin="dense"
              label={"Name"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={e => {
                changeName(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Email</span>
            <TextField
              margin="dense"
              label={"Email"}
              type={"email"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={e => {
                changeEmail(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Password</span>
            <TextField
              label={"Password"}
              margin="dense"
              type={"password"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={e => {
                changePassword(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Confirmation</span>
            <TextField
              margin="dense"
              label={"Password confirmation"}
              type={"password"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={e => {
                changeConfirmation(e.target.value);
              }}
            />
          </div>
          {props.type === "doctor" ||
          props.type === "nurse" ||
          props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Birthdate</span>
              <TextField
                margin="dense"
                label={"Birthdate"}
                type={"date"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeBirthdate(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}
          {props.type === "doctor" ||
          props.type === "nurse" ||
          props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Home address</span>
              <TextField
                margin="dense"
                label={"Home address"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeHomeaddress(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}
          {props.type === "doctor" || props.type === "nurse" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Work address</span>
              <TextField
                margin="dense"
                label={"Work address"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeWorkaddress(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {props.type === "doctor" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Specialty</span>
              <TextField
                margin="dense"
                label={"Specialty"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeSpecialty(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}
          {props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Weight</span>
              <TextField
                margin="dense"
                label={"Weight"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeWeight(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}
          {props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Height</span>
              <TextField
                margin="dense"
                label={"Height"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                required={true}
                onChange={e => {
                  changeHeight(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {props.type === "doctor" ||
          props.type === "nurse" ||
          props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Gender</span>
              <FormControl
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                margin={"dense"}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={e => changeGender(e.target.value)}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            ""
          )}

          <div className={"simpleSet"}>
            <Button
              onClick={() => {
                let profile = {};
                profile.name = name;
                profile.email = email;
                profile.password = password;
                profile.c_password = c_password;
                switch (props.type) {
                  case "doctor":
                    profile.birthdate = birthdate;
                    profile.home_address = homeAddress;
                    profile.work_address = workAddress;
                    profile.specialty = specialty;
                    profile.gender = gender;
                    break;
                  case "nurse":
                    profile.birthdate = birthdate;
                    profile.home_address = homeAddress;
                    profile.work_address = workAddress;
                    profile.gender = gender;
                    break;
                  case "patient":
                    profile.weight = weight;
                    profile.height = height;
                    profile.birthdate = birthdate;
                    profile.home_address = homeAddress;
                    profile.gender = gender;
                    break;
                  default:
                    break;
                }
                var validator = require("email-validator");
                if (!validator.validate(email)) {
                  changeAlertText("Please check your entries !");
                  changeAlertForm(false);
                  openAlert(true);
                } else {
                  props.dispatch(
                    addNewUser(
                      profile,
                      props.type,
                      JSON.parse(localStorage.getItem("user")).token
                    )
                  );
                }
              }}
              color={"primary"}
              style={{
                marginLeft: "auto",
                marginRight: "50px",
                marginTop: "10px"
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
    crudUser: state.crudReducer
  };
}

export default connect(mapStateToProps)(AddUserComponent);
