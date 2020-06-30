import React, { useState, useEffect } from "react";
import "./doctorTransactions.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "../../../../dashboard/components/CustomButtons/Button.js";
import Close from "@material-ui/icons/Close";
import { Pagination } from "@material-ui/lab";
import { connect } from "react-redux";
import { getProfileInfo } from "../../../../redux/actions";
function AffectRequestComponent(props) {
  const [doctorName, changeDoctorName] = useState("");
  const [mainDoctorsTx, changeMainDoctorsTx] = useState([]);
  const [doctorsTx, changeDoctorsTx] = useState([]);
  const [selectedDoctorsTx, changeSelectedDoctorsTx] = useState([]);

  const range = 5;
  useEffect(() => {
    const fetchData = async () => {
      let result = props.blockchainReducer.doctorsTx;
      if (result) {
        result.sort(function (a, b) {
          return a.timestamp > b.timestamp
            ? -1
            : a.timestamp < b.timestamp
            ? 1
            : 0;
        });

        for (let i = 0; i < result.length; i++) {
          result[i].timestamp = result[i].timestamp
            .slice(0, 19)
            .replace("T", " ");
          let doctor = await getProfileInfo(
            result[i].doctor.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          result[i].doctor = doctor.data.name;
          let patient = await getProfileInfo(
            result[i].patient.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          result[i].patient = patient.data.name;
        }
        changeDoctorsTx(result);
        changeMainDoctorsTx(result);
        changeSelectedDoctorsTx(result.slice(0, range));
        props.blockchainReducer.doctorsTx = null;
      }
    };
    fetchData();
  }, [props.blockchainReducer.doctorsTx]);

  const searchByName = () => {
    if (doctorName === "") {
      changeDoctorsTx(mainDoctorsTx);
      changeSelectedDoctorsTx(mainDoctorsTx.slice(0, range));
    } else {
      let newDoctorsTx = mainDoctorsTx.filter((val) => {
        if (val.doctor == doctorName) {
          return val;
        }
      });
      changeDoctorsTx(newDoctorsTx);
      changeSelectedDoctorsTx(newDoctorsTx.slice(0, range));
    }
  };

  const handlePageChange = (pageNumber) => {
    changeSelectedDoctorsTx(
      doctorsTx.slice((pageNumber - 1) * range, pageNumber * range)
    );
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"lg"}>
        <div className={"doctorsTxContainer"}>
          <div className={"doctorsTxTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Doctor transactions</h3>
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
          <div
            style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}
          >
            <TextField
              margin="dense"
              label={"Doctor name"}
              variant={"outlined"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginTop: 20, width: "30%" }}
              required={true}
              onChange={(e) => {
                changeDoctorName(e.target.value);
              }}
            />

            <Button
              onClick={searchByName}
              color={"primary"}
              style={{
                marginLeft: "auto",
                marginTop: "20px",
              }}
            >
              Search by doctor name
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Transaction Id</TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Transaction type
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Appointment doctor
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Appointment patient
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Transaction date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDoctorsTx.map((row) => (
                <TableRow key={row.transactionId}>
                  <TableCell component="th" scope="row">
                    {row.transactionId}
                  </TableCell>
                  <TableCell >Arrange Appointment</TableCell>
                  <TableCell >{row.doctor}</TableCell>
                  <TableCell >
                    {row.patient}
                  </TableCell>
                  <TableCell >{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            count={
              doctorsTx.length <= range
                ? 1
                : Math.ceil(doctorsTx.length / range)
            }
            color="primary"
            style={{ position: "absolute", bottom: 10, left: 5 }}
            onChange={(e, p) => handlePageChange(p)}
          />
        </div>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blockchainReducer: state.blockchainReducer,
  };
}

export default connect(mapStateToProps)(AffectRequestComponent);
