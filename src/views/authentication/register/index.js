import React, { Component } from "react";
import "./register.css";
import { Button, TextField } from "@material-ui/core";
import Alert from "./../components/alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { register } from "./../../../redux/actions";
import logo from "./../../../assets/logo/logoWithNoText.png";

class RegisterComponent extends Component {
  state = {
    email: "",
    password: "",
    c_password: "",
    name: "",
    openAlert: false,
    type: "",
    gender: "",
    birthdate: "",
    h_address: "",
    alertText: ""
  };

  signUpForm = async () => {};

  handleClose = () => {
    this.setState({
      openAlert: false
    });
  };

  render() {
    return (
      <div className={"SignUpcontainer"}>
        <div className={"sFormContainer"}>
        <img src={logo} style={{width:100, height:100,marginBottom: 30}}/>
        <TextField
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          <TextField
            label="Confirm your password"
            type="password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => {
              this.setState({ c_password: e.target.value });
            }}
          />
          <TextField
            label="Full name"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <TextField
            label="Home address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => {
              this.setState({ h_address: e.target.value });
            }}
          />
          <TextField
            label="Birthday"
            type="date"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => {
              this.setState({ birthdate: e.target.value });
            }}
          />

          <FormControl style={{ width: "80%" }} margin={"dense"}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={this.state.gender}
              onChange={e => this.setState({ gender: e.target.value })}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "80%" }} margin={"dense"}>
            <InputLabel>Type</InputLabel>
            <Select
              value={this.state.type}
              onChange={e => this.setState({ type: e.target.value })}
            >
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Nurse"}>Nurse</MenuItem>
              <MenuItem value={"Patient"}>Patient</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.dispatch(
                register(
                  this.state.email,
                  this.state.password,
                  this.state.c_password,
                  this.state.name,
                  this.state.h_address,
                  this.state.birthdate,
                  this.state.gender,
                  this.state.type
                )
              );
            }}
            type={"submit"}
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold",
              margin: 10
            }}
          >
            Sign Up
          </Button>
        </div>
        <div className={"signInCont"}>
          <p>You have an account ?</p>
          <Button
            href={"/login"}
            style={{ fontWeight: "bold", color: "#3897f0" }}
          >
            Sign In !
          </Button>
        </div>
        <Alert
          open={this.state.openAlert}
          close={this.handleClose}
          text={this.state.alertText}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.registerResult) {
      if (this.props.auth.registerResult.code === "03" && this.props !== prevProps) {
        this.setState({
          openAlert: true,
          success: false,
          alertText: "Email already exist"
        });
      } else if (this.props.auth.registerResult.code === "02" && this.props !== prevProps) {
        this.setState({
          openAlert: true,
          success: false,
          alertText: "Please check your entries"
        });
      }
    }
  }

  componentDidMount(){
    document.title = 'Register';
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}
export default connect(mapStateToProps)(RegisterComponent);
