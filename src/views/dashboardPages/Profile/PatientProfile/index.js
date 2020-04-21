import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../../../dashboard/components/Grid/GridItem.js";
import GridContainer from "../../../../dashboard/components/Grid/GridContainer.js";
import CustomInput from "../../../../dashboard/components/CustomInput/CustomInput.js";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Card from "../../../../dashboard/components/Card/Card.js";
import CardHeader from "../../../../dashboard/components/Card/CardHeader.js";
import CardAvatar from "../../../../dashboard/components/Card/CardAvatar.js";
import CardBody from "../../../../dashboard/components/Card/CardBody.js";
import CardFooter from "../../../../dashboard/components/Card/CardFooter.js";
import { connect } from "react-redux";

import avatar from "./../../../../assets/img/patientDefaultPic.png";
import ChangePasswordAlert from "../../Components/PasswordChange";
import { updatePatientProfile } from "./../../../../redux/actions";
import ResultAlert from "./../../../authentication/components/alert";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function Profile(props) {
  const classes = useStyles();
  const [open, openAlert] = useState(false);
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [birthdate, changeBirthdate] = useState("");
  const [homeAddress, changeHomeAddress] = useState("");
  const [weight, changeWeight] = useState("");
  const [height, changeHeight] = useState("");
  const [aboutMe, changeAboutMe] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [updateProfileAlert, openUpdateProfileAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  const dispatchUpdateProfile = () => {
    var validator = require("email-validator");
    if (!validator.validate(email) || name===''){
      changeAlertText("Please check your entries");
      changeAlertForm(false);
      openUpdateProfileAlert(true)
    }else{
      props.dispatch(
        updatePatientProfile(
          user.id,
          name,
          email,
          birthdate,
          homeAddress,
          weight,
          height,
          aboutMe,
          user.token,
        )
      );
    }
  }
  
  useEffect(() => {
    document.title = "Profile";
  }, []);
  useEffect(() => {
    let result = props.updateProfile.updateProfileResult;
    if(result){
      if(result.code==='0'){
        changeAlertText("Your profile has been successfully updated");
        changeAlertForm(true);
        openUpdateProfileAlert(true)
      }else if(result.code!=='0'){
        changeAlertText("Please check your entries");
        changeAlertForm(false);
        openUpdateProfileAlert(true)
      }
    }
  }, [props.updateProfile]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3}>
                  <CustomInput
                    labelText="Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeName(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeEmail(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <CustomInput
                    labelText="Birthdate"
                    type={"date"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeBirthdate(e.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={6}>
                  <CustomInput
                    labelText="Home address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeHomeAddress(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <CustomInput
                    labelText="Weight (KG)"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeWeight(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <CustomInput
                    labelText="Height (M)"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={e => {
                      changeHeight(e.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                    onChange={e => {
                      changeAboutMe(e.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={dispatchUpdateProfile}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card profile>
            <CardAvatar profile>
              <img src={avatar} alt="..." />
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Patient</h6>
              <h4 className={classes.cardTitle}>{user.name}</h4>
              <Button
                color="primary"
                onClick={() => {
                  openAlert(true);
                }}
              >
                Change password
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <ChangePasswordAlert
        open={open}
        close={() => {
          openAlert(false);
        }}
      />
      <ResultAlert
        open={updateProfileAlert}
        close={() => {
          openUpdateProfileAlert(false);
        }}
        text={alertText}
        success={success}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    updateProfile: state.profileReducer
  };
}

export default connect(mapStateToProps)(Profile);
