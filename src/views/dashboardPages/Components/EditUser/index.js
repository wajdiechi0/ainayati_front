import React, { useState, useEffect } from "react";
import "./editUser.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import {
  fetchPatientList,
  fetchNurseList,
  fetchDoctorList,
  fetchAdminList,
  editUserProfile
} from "../../../../redux/actions";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ResultAlert from "../../../authentication/components/alert";

function EditUserComponent(props) {
  const [name, changeName] = useState(props.editUser.name);
  const [email, changeEmail] = useState(props.editUser.email);
  const [birthdate, changeBirthdate] = useState(props.editUser.birthdate);
  const [homeAddress, changeHomeaddress] = useState(props.editUser.homeAddress);
  const [workAddress, changeWorkaddress] = useState(props.editUser.workAddress);
  const [specialty, changeSpecialty] = useState(props.editUser.specialty);
  const [weight, changeWeight] = useState(props.editUser.weight);
  const [height, changeHeight] = useState(props.editUser.height);
  const [gender, changeGender] = useState(props.editUser.gender);

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  useEffect(() => {
    let result = props.userProfile.updateProfileResult;
    if (result) {
      changeAlertText(result.message);
      openAlert(true);
      if (result.code !== "0") {
        changeAlertForm(false);
      } else if (result.code === "0") {
        switch (props.type) {
          case "admin":
            props.dispatch(
              fetchAdminList(JSON.parse(localStorage.getItem("user")).token)
            );
            break;
          case "doctor":
            props.dispatch(
              fetchDoctorList(JSON.parse(localStorage.getItem("user")).token)
            );
            break;
          case "nurse":
            props.dispatch(
              fetchNurseList(JSON.parse(localStorage.getItem("user")).token)
            );
            break;
          case "patient":
            props.dispatch(
              fetchPatientList(JSON.parse(localStorage.getItem("user")).token)
            );
            break;
          default:
            break;
        }

        changeAlertForm(true);
      }
      props.userProfile.updateProfileResult = null;
    }
  }, [props.userProfile.updateProfileResult, props]);

  useEffect(() => {
    changeName(props.editUser.name);
    changeEmail(props.editUser.email);
    changeBirthdate(props.editUser.birthdate);
    changeWorkaddress(props.editUser.workAddress);
    changeHomeaddress(props.editUser.homeAddress);
    changeSpecialty(props.editUser.specialty);
    changeWeight(props.editUser.weight);
    changeHeight(props.editUser.height);
    changeGender(props.editUser.gender);
  }, [
    props.editUser.name,
    props.editUser.email,
    props.editUser.birthdate,
    props.editUser.workAddress,
    props.editUser.homeAddress,
    props.editUser.specialty,
    props.editUser.weight,
    props.editUser.height,
    props.editUser.gender
  ]);

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div className={"addDoctorContainer"}>
          <div className={"dialogTitle"}>
            <h3 style={{ marginLeft: "auto" }}>
              Edit {props.type} #{props.editUser.id}
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
              opacity: 0.5
            }}
          />
          <div className={"textfieldCont"}>
            <span className={"formText"}>Name</span>
            <TextField
              margin="dense"
              label={"Name"}
              defaultValue={props.editUser.name}
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
              defaultValue={props.editUser.email}
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
          {props.type === "doctor" ||
          props.type === "nurse" ||
          props.type === "patient" ? (
            <div className={"textfieldCont"}>
              <span className={"formText"}>Birthdate</span>
              <TextField
                margin="dense"
                label={"Birthdate"}
                defaultValue={props.editUser.birthdate}
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
                defaultValue={props.editUser.home_address}
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
                defaultValue={props.editUser.work_address}
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
                defaultValue={props.editUser.specialty}
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
                defaultValue={props.editUser.weight}
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
                defaultValue={props.editUser.height}
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
                profile.id = props.editUser.id;
                profile.name = name;
                profile.email = email;
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
                if (
                  !validator.validate(email) ||
                  name === "" ||
                  birthdate === ""
                ) {
                  changeAlertText("Please check your entries !");
                  changeAlertForm(false);
                  openAlert(true);
                } else {
                  props.dispatch(
                    editUserProfile(
                      profile,
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
    userProfile: state.profileReducer
  };
}

export default connect(mapStateToProps)(EditUserComponent);
