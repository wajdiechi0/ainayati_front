import React from "react";
import "./deleteConfirmation.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import Error from "@material-ui/icons/Error";
import { Button } from "@material-ui/core";

export default function DeleteConfirmationComponent(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div style={{ width: 300 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={props.close}>
              <Close />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Error style={{ color: "#ddd", marginLeft: 10 }} />
            </div>
            <h5 style={{ marginLeft: 10, marginRight: 10 }}>Are you sure ?</h5>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "80%",
                backgroundColor: "#3897f0",
                fontWeight: "bold",
                margin: 10,
              }}
              onClick={() => {
                props.close();
                props.function();
              }}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              style={{
                width: "80%",
                fontWeight: "bold",
                margin: 10,
              }}
              onClick={props.close}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
