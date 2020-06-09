import React, { useState, useEffect } from "react";
import "./checkup.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Favorite from "@material-ui/icons/Favorite";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Close from "@material-ui/icons/Close";
import Activities from "./Components/Activities";
import HeartRates from "./Components/HeartRates";

function CheckupComponent(props) {
  const [list, changeList] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {}, []);
  useEffect(() => {}, [props.healthReducer]);

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"md"}>
        <div className={"affectRequestsContainer"}>
          <div className={"affectRequestTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Patient checkup</h3>
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
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Activities" icon={<DirectionsRun />} />
            <Tab label="Heart rates" icon={<Favorite />} />
          </Tabs>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              width: "100%",
              height: 1,
              opacity: 0.5,
            }}
          />
          {value === 0 ? (
            <Activities patientEmail={props.checkupPatient.email} />
          ) : (
            <HeartRates patientEmail={props.checkupPatient.email} />
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default CheckupComponent;
