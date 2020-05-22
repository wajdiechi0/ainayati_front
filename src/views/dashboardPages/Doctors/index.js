import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "../../../dashboard/components/CustomButtons/Button.js";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import ResultAlert from "../../authentication/components/alert";

import { connect } from "react-redux";
import {
  fetchDoctorList,
  removeUser,
  removeAffectDoctorPatient,
  removeAffectDoctorNurse,
  sendAppointmentRequest,
} from "./../../../redux/actions";
import AddDoctor from "../Components/AddUser";
import EditDoctor from "../Components/EditUser";
import AffectRequest from "../Components/SendAffectRequest";
class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      idEdit: "",
      open: false,
      alertText: "",
      disabled: false,
      success: true,
      editDoctor: {},
      addDoctorOpen: false,
      editDoctorOpen: false,
      AffectRequestOpen: false,
    };
  }

  reloadUserList(filtered) {
    this.setState({
      doctors: filtered,
    });
  }

  deleteUser(userId) {
    var filtered = this.state.doctors.filter((value) => {
      return value.id !== userId;
    });
    this.reloadUserList(filtered);
    if (
      JSON.parse(localStorage.getItem("user")).type === "doctor" ||
      JSON.parse(localStorage.getItem("user")).type === "patient"
    ) {
      this.props.dispatch(
        removeAffectDoctorPatient(
          userId,
          JSON.parse(localStorage.getItem("user")).id,
          JSON.parse(localStorage.getItem("user")).token
        )
      );
    } else if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
      this.props.dispatch(
        removeAffectDoctorNurse(
          userId,
          JSON.parse(localStorage.getItem("user")).id,
          JSON.parse(localStorage.getItem("user")).token
        )
      );
    } else {
      this.props.dispatch(
        removeUser(userId, JSON.parse(localStorage.getItem("user")).token)
      );
    }
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          {JSON.parse(localStorage.getItem("user")).type === "patient" ||
          JSON.parse(localStorage.getItem("user")).type === "nurse"
            ? "My Doctor List"
            : "Doctors List"}
        </Typography>
        {JSON.parse(localStorage.getItem("user")).type === "patient" ||
        JSON.parse(localStorage.getItem("user")).type === "nurse" ? (
          <Button
            variant="contained"
            style={{ background: "#9c27b0", color: "#fff", marginTop: 30 }}
            onClick={() => {
              this.setState({ AffectRequestOpen: true });
            }}
          >
            Send affect request
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ background: "#9c27b0", color: "#fff", marginTop: 30 }}
            onClick={() => {
              this.setState({ addDoctorOpen: true });
            }}
          >
            Add a doctor
          </Button>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Birthdate
                  </TableCell>
                )}
              {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Home Address
                  </TableCell>
                )}
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Work Address
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Specialty
              </TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Gender
                  </TableCell>
                )}

              {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                  <TableCell align="right" />
                )}
              {JSON.parse(localStorage.getItem("user")).type === "patient" && (
                <TableCell align="right" />
              )}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.doctors.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                  JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                    <TableCell align="right">{row.birthdate}</TableCell>
                  )}
                {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                  JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                    <TableCell align="right">{row.home_address}</TableCell>
                  )}
                <TableCell align="right">{row.work_address}</TableCell>
                <TableCell align="right">{row.specialty}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                  JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                    <TableCell align="right">{row.gender}</TableCell>
                  )}
                {JSON.parse(localStorage.getItem("user")).type !== "patient" &&
                  JSON.parse(localStorage.getItem("user")).type !== "nurse" && (
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          this.setState({
                            editDoctor: row,
                            editDoctorOpen: true,
                          });
                        }}
                      >
                        <CreateIcon style={{ color: "#0033cc" }} />
                      </IconButton>
                    </TableCell>
                  )}
                <TableCell align="right">
                  <IconButton onClick={() => this.deleteUser(row.id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
                {JSON.parse(localStorage.getItem("user")).type ===
                  "patient" && (
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        this.setState({
                          disabled: true,
                        });
                        this.props.dispatch(
                          sendAppointmentRequest(
                            row.id,
                            JSON.parse(localStorage.getItem("user")).id,
                            JSON.parse(localStorage.getItem("user")).token
                          )
                        );
                      }}
                      color={"info"}
                      disabled={this.state.disabled}
                    >
                      Ask for an appointment
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddDoctor
          open={this.state.addDoctorOpen}
          close={() => {
            this.setState({ addDoctorOpen: false });
          }}
          type="doctor"
        />
        <EditDoctor
          open={this.state.editDoctorOpen}
          close={() => {
            this.setState({ editDoctorOpen: false });
          }}
          editUser={this.state.editDoctor}
          type="doctor"
        />
        <AffectRequest
          open={this.state.AffectRequestOpen}
          type={JSON.parse(localStorage.getItem("user")).type}
          close={() => {
            this.setState({ AffectRequestOpen: false });
          }}
        />

        <ResultAlert
          open={this.state.open}
          close={() => {
            this.setState({
              open: false,
            });
          }}
          text={this.state.alertText}
          success={this.state.success}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.crudUser.sendAppointmentRequest &&
      prevProps !== this.props
    ) {
      let result = this.props.crudUser.sendAppointmentRequest;
      if (result) {

        this.setState({
          disabled: false
        })
        if (result.code === "0") {
          this.setState({
            open: true,
            alertText: result.message,
            success: true,
          });
        } else {
          this.setState({
            open: true,
            alertText: result.message,
            success: false,
          });
        }
      }
      this.props.crudUser.sendAppointmentRequest = null;
    }
    if (this.props.crudUser.doctorList && prevProps !== this.props) {
      if (this.props.crudUser.doctorList.code === "0") {
        this.setState({
          doctors: this.props.crudUser.doctorList.data,
        });
        this.props.crudUser.doctorList = null;
      }
    }
  }
  componentDidMount() {
    document.title = "Doctors";
    this.props.dispatch(
      fetchDoctorList(JSON.parse(localStorage.getItem("user")).token)
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
  };
}
export default connect(mapStateToProps)(Doctors);
