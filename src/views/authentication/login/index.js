import React from "react";
import "./login.css";
import { TextField, Button } from "@material-ui/core";
import Alert from "../components/alert";
import { connect } from "react-redux";
import { login } from "./../../../redux/actions";
import logo from "./../../../assets/logo/logoWithNoText.png";
class LoginComponent extends React.Component {
  state = {
    email: "",
    password: "",
    open: false,
    alertText: ""
  };

  signInForm = async () => {
    this.props.dispatch(login(this.state.email, this.state.password));
  };

  render() {
    return (
      <div className={"lContainer"}>
        <div className={"lFormContainer"}>
          <img
            src={logo}
            style={{ width: 100, height: 100, marginBottom: 30 }}
            alt={"Ainayati"}
          />
          <TextField
            id="outlined-dense"
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button
            href={"/resetpassword"}
            style={{ fontWeight: "bold", color: "#3897f0" }}
          >
            {" "}
            Forgot Password ?
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.signInForm}
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold"
            }}
          >
            Sign In
          </Button>
          <div className={"signUpCont"}>
            <p>Don't have an account ?</p>
            <Button
              href={"/register"}
              style={{ fontWeight: "bold", color: "#3897f0" }}
            >
              Sign Up !
            </Button>
          </div>
        </div>
        <Alert
          open={this.state.open}
          close={() => {
            this.setState({
              open: false
            });
          }}
          success={false}
          text={this.state.alertText}
        />
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.loginResult) {
      if (
        this.props.auth.loginResult.code !== "0" &&
        this.props !== prevProps
      ) {
        this.setState({
          open: true,
          alertText: "Please check your entries"
        });
      } else if (
        this.props.auth.loginResult.code === "0" &&
        this.props !== prevProps
      ) {
        localStorage.setItem("user", JSON.stringify(this.props.auth.loginResult.data));
        window.location.reload();
      }
    }
  }

  componentDidMount() {
    document.title = "Login";
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(LoginComponent);
