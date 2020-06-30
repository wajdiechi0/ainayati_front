import React, { Component } from "react";
import "./reset.css";
import { Button, TextField } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Alert from "../components/alert";
import { connect } from "react-redux";
import { sendResetLink } from "./../../../redux/actions";
class ResetPasswordComponent extends Component {
  state = {
    email: "",
    openAlert: false,
    success: false,
    disabled: false,
  };

  handleClose = () => {
    this.setState({
      openAlert: false
    });
  };

  reset = () => {
    this.setState({
      disabled: true,
    });
    this.props.dispatch(sendResetLink(this.state.email));
  };
  render() {
    return (
      <div className={"rContainer"}>
        <div className={"rFormContainer"}>
          <Lock style={{ width: 65, height: 65}} />
          <h3>Trouble While Logging In?</h3>
          <p style={{ color: "#9d9d9d", fontWeight: "light", margin: "10%" }}>
            Enter your email and you'll receive a link to reset your password
          </p>
          <TextField
            id="outlined-dense"
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            onChange={e => {
              this.setState({
                email: e.target.value
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
              margin: 10
            }}
            onClick={this.reset}
            disabled={this.state.disabled}
          >
            Send Reset Link
          </Button>
          <div className={"orContR"}>
            <div className={"line"} />
            <p style={{ color: "#b3b3b3", fontWeight: "bold", margin: "5%" }}>
              OR
            </p>
            <div className={"line"} />
          </div>
          <Button
            href={"/register"}
            style={{ fontWeight: "bold", color: "black" }}
          >
            {" "}
            Create New Account
          </Button>
          <div className={"backLogin"}>
            <Button
              href={"/login"}
              style={{ fontWeight: "bold", color: "#282828" 
            }}
            >
              Back To Login
            </Button>
          </div>
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
    if (this.props.auth.resetSendResult && this.props !== prevProps) {
      this.setState({
        disabled: false,
      });
      this.setState({ openAlert: true, success: true, alertText: "Check your email!" });
    } else if (!this.props.auth.resetSendResult && this.props !== prevProps) {
      this.setState({
        disabled: false,
      });
      this.setState({ openAlert: true,success: false, alertText: "Please check your entries" });
    }
  }

  componentDidMount(){
    document.title = 'Send reset link';
  }
}
function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}
export default connect(mapStateToProps)(ResetPasswordComponent);
