import React, { Component } from "react";
import "./resetLink.css";
import { Button, TextField } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Alert from "../components/alert";
import { connect } from "react-redux";
import { resetPassword } from "./../../../redux/actions";
import { navigate } from "@reach/router";

class ResetLinkComponent extends Component {
  state = {
    email: "",
    password: "",
    c_password: "",
    openAlert: false,
    success: false,
    alertText: "",
    disabled:false,
  };

  handleClose = () => {
    this.setState({
      openAlert: false,
    });
  };

  reset = () => {
    this.setState({
      disabled:true
    })
    this.props.dispatch(
      resetPassword(
        this.state.email,
        this.state.password,
        this.state.c_password,
        this.props.match.params.token
      )
    );
  };
  render() {
    return (
      <div className={"rlContainer"}>
        <div className={"rlFormContainer"}>
          <Lock style={{ width: 65, height: 65 }} />
          <p style={{ color: "#9d9d9d", fontWeight: "light", margin: "10%" }}>
            Please confirm your new password
          </p>
          <TextField
            label="Email"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            onChange={(e) => {
              this.setState({
                email: e.target.value,
              });
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"password"}
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
          <TextField
            label="Confirm your password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"password"}
            onChange={(e) => {
              this.setState({
                c_password: e.target.value,
              });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold",
              margin: 10,
            }}
            onClick={this.reset}
            disabled={this.state.disabled}
          >
            Reset Password
          </Button>
          <Button
            href={"/login"}
            style={{ fontWeight: "bold", color: "#282828" }}
          >
            Back To Login
          </Button>
        </div>
        <Alert
          open={this.state.openAlert}
          close={this.handleClose}
          success={this.state.success}
          text={this.state.alertText}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.resetResult) {
      this.setState({
        disabled:false
      })
      if (
        this.props.auth.resetResult.code === "02" &&
        this.props !== prevProps
      ) {
        this.setState({
          openAlert: true,
          success: false,
          alertText: "Please check your entries",
        });
      } else if (
        this.props.auth.resetResult.code === "04" &&
        this.props !== prevProps
      ) {
        this.setState({
          openAlert: true,
          success: false,
          alertText: this.props.auth.resetResult.data,
        });
      } else if (
        this.props.auth.resetResult.code === "0" &&
        this.props !== prevProps
      ) {
        this.setState({
          openAlert: true,
          success: true,
          alertText: "Your password has been successfully changed",
        });
      }
    }
  }

  componentDidMount() {
    document.title = "Reset password";
  }
}
function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}
export default connect(mapStateToProps)(ResetLinkComponent);
