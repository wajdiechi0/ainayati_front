import React, { useState, useEffect } from "react";
import "./passwordChange.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { changePassword } from "../../../../redux/actions";
import ResultAlert from "../../../authentication/components/alert";
function PasswordChangeComponent(props) {
  const [current_password, changeCurrentPassword] = useState("");
  const [new_password, changeNewPassword] = useState("");
  const [confirm_password, changeConfirmation] = useState("");

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);

  useEffect(() => {
    let result = props.auth.changePasswordResult;
    if(result){
        changeAlertText(result.message);
        openAlert(true);
        if(result.code !== '0'){
            changeAlertForm(false);
        }else if ( result.code ==='0'){
            changeAlertForm(true);
        }
    }
  }, [props.auth.changePasswordResult]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div className={"sContainer"}>
          <div className={"dialogTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Change your password</h3>
            <IconButton style={{ marginLeft: "auto" }} onClick={props.close}>
              <Close />
            </IconButton>
          </div>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              width: "100%",
              height: 0.7,
              opacity: 0.5
            }}
          />
          <div className={"textfieldCont"}>
            <span className={"formText"}>Current password</span>
            <TextField
              margin="dense"
              label={"Current password"}
              variant="outlined"
              type={"password"}
              InputLabelProps={{ style: { fontSize: ".9em" } }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "10px", width: "60%" }}
              required={true}
              onChange={e => {
                changeCurrentPassword(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>New password</span>
            <TextField
              label={"New password"}
              margin="dense"
              variant="outlined"
              type={"password"}
              InputLabelProps={{ style: { fontSize: ".9em" } }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "10px", width: "60%" }}
              required={true}
              onChange={e => {
                changeNewPassword(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Confirmation</span>
            <TextField
              margin="dense"
              label={"Password confirmatino"}
              type={"password"}
              variant="outlined"
              InputLabelProps={{ style: { fontSize: ".9em" } }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "10px", width: "60%" }}
              required={true}
              onChange={e => {
                changeConfirmation(e.target.value);
              }}
            />
          </div>
          <div className={"simpleSet"}>
            <Button
              onClick={() => {
                props.dispatch(
                  changePassword(
                    JSON.parse(localStorage.getItem("user")).id,
                    current_password,
                    new_password,
                    confirm_password,
                    JSON.parse(localStorage.getItem("user")).token
                  )
                );
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
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(PasswordChangeComponent);
