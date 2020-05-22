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

import { connect } from "react-redux";
import {
  fetchPatientList,
  removeUser,
  removeAffectDoctorPatient,
  getProfileInfo,
} from "./../../../redux/actions";
import AddPatient from "../Components/AddUser";
import AffectRequests from "../Components/doctorAffectRequests";
import EditPatient from "../Components/EditUser";
import AddAppointment from "../Components/AddAppointment";
class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      idEdit: "",
      addAppointmentOpen: false,
      disabled: false,
      editPatient: {},
      addPatientOpen: false,
      editPatientOpen: false,
      affectRequestsOpen: false,
      addAppointmentPatient: {},
    };
  }

  reloadUserList(filtered) {
    this.setState({
      patients: filtered,
    });
  }

  deleteUser(userId) {
    var filtered = this.state.patients.filter((value) => {
      return value.id !== userId;
    });
    this.reloadUserList(filtered);
    if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
      this.props.dispatch(
        removeAffectDoctorPatient(
          JSON.parse(localStorage.getItem("user")).id,
          userId,
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
          Patient List
        </Typography>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#9c27b0", color: "#fff" }}
            onClick={() => {
              this.setState({ addPatientOpen: true });
            }}
          >
            Add a patient
          </Button>
          {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
            <Button
              onClick={() => {
                this.setState({ affectRequestsOpen: true });
              }}
              style={{
                marginLeft: "auto",
                background: "#00acc1",
                color: "#fff",
              }}
              color={"primary"}
            >
              Affect Requests
            </Button>
          )}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Patient name
              </TableCell>
              {JSON.parse(localStorage.getItem("user")).type === "nurse" && (
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Doctor name
                </TableCell>
              )}
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Birthdate
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Home Address
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Weight(KG)
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Height(M)
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Gender
              </TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                <TableCell align="right" />
              )}
              <TableCell align="right" />

              {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
                <TableCell align="right" />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.patients.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type === "nurse" && (
                  <TableCell align="right">{row.doctor}</TableCell>
                )}
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.home_address}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        this.setState({
                          editPatient: row,
                          editPatientOpen: true,
                        });
                      }}
                    >
                      <CreateIcon style={{ color: "#0033cc" }} />
                    </IconButton>
                  </TableCell>
                )}

                {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        this.setState({
                          addAppointmentPatient: row,
                          addAppointmentOpen: true,
                        });
                      }}
                      color={"info"}
                      disabled={this.state.disabled}
                    >
                      Add an appointment
                    </Button>
                  </TableCell>
                )}
                <TableCell align="right">
                  <IconButton onClick={() => this.deleteUser(row.id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddPatient
          open={this.state.addPatientOpen}
          type="patient"
          from={JSON.parse(localStorage.getItem("user")).type}
          close={() => {
            this.setState({ addPatientOpen: false });
          }}
        />
        <EditPatient
          open={this.state.editPatientOpen}
          type="patient"
          close={() => {
            this.setState({ editPatientOpen: false });
          }}
          editUser={this.state.editPatient}
        />
        <AffectRequests
          open={this.state.affectRequestsOpen}
          type="patient"
          close={() => {
            this.setState({ affectRequestsOpen: false });
          }}
        />
        <AddAppointment
          open={this.state.addAppointmentOpen}
          addAppointmentPatient={this.state.addAppointmentPatient}
          close={() => {
            this.setState({ addAppointmentOpen: false });
          }}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const fetchList = async () => {
      let result = this.props.crudUser.patientList;
      if (result && prevProps !== this.props) {
        if (result.code === "0") {
          for (
            let i = 0;
            i < result.data.length;
            i++
          ) {
            let doctor = await getProfileInfo(
              result.data[i].id_doctor,
              JSON.parse(localStorage.getItem("user")).token
            );
            result.data[i].doctor = doctor.data.name;
          }
          this.setState({
            patients: result.data,
          });
        }
        this.props.crudUser.patientList = null;
      }
    };
    fetchList();
  }
  componentDidMount() {
    document.title = "Patients";
    this.props.dispatch(
      fetchPatientList(JSON.parse(localStorage.getItem("user")).token)
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
export default connect(mapStateToProps)(Patients);
