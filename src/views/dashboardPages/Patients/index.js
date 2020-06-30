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
import { Pagination } from "@material-ui/lab";
import DeleteConfirmation from "./../../authentication/components/DeleteConfirmation";

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
import Checkup from "../Components/Checkup";
import PatientAppointments from "../Components/PatientAppointments";
class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
      selectedPatientList: [],
      idEdit: "",
      addAppointmentOpen: false,
      disabled: false,
      pageNumber: 1,
      editPatient: {},
      patient: null,
      addPatientOpen: false,
      editPatientOpen: false,
      affectRequestsOpen: false,
      addAppointmentPatient: {},
      checkupPatient: {},
      checkupOpen: false,
      range: 5,
      rowId: 0,
      deleteConfirmationOpen: false,
      patientAppointmentsOpen: false,
    };
  }

  deleteUser(userId) {
    var filtered = this.state.selectedPatientList.filter((value) => {
      return value.id !== userId;
    });
    console.log(this.state.selec);
    this.setState({
      selectedPatientList: filtered,
    });
    filtered = this.state.patientList.filter((value) => {
      return value.id !== userId;
    });
    this.setState({
      patientList: filtered,
    });
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
    location.reload();
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      pageNumber,
      selectedPatientList: this.state.patientList.slice(
        (pageNumber - 1) * this.state.range,
        this.state.range * pageNumber
      ),
    });
    console.log(this.state.selectedPatientList);
  };
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
              <TableCell style={{ fontWeight: "bold" }}>Patient name</TableCell>
              {(JSON.parse(localStorage.getItem("user")).type === "nurse" ||
                JSON.parse(localStorage.getItem("user")).type ===
                  "super admin" ||
                JSON.parse(localStorage.getItem("user")).type === "admin") && (
                <TableCell style={{ fontWeight: "bold" }}>
                  Doctor name
                </TableCell>
              )}
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Birthdate</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Home Address</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Weight(KG)</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Height(M)</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Gender</TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                <TableCell />
              )}
              <TableCell />
              <TableCell />
              {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
                <TableCell />
              )}
              {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
                <TableCell />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.selectedPatientList.map((row) => (
              <TableRow
                key={
                  row.id_doctor
                    ? row.id.toString() + row.id_doctor.toString()
                    : row.id.toString()
                }
              >
                <TableCell>{row.name}</TableCell>
                {(JSON.parse(localStorage.getItem("user")).type === "nurse" ||
                  JSON.parse(localStorage.getItem("user")).type ===
                    "super admin" ||
                  JSON.parse(localStorage.getItem("user")).type ===
                    "admin") && <TableCell>{row.doctor}</TableCell>}
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.birthdate}</TableCell>
                <TableCell>{row.home_address}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.height}</TableCell>
                <TableCell>{row.gender}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                  <TableCell>
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
                  <TableCell>
                    <Button
                      onClick={() => {
                        this.setState({
                          addAppointmentPatient: row,
                          addAppointmentOpen: true,
                        });
                      }}
                      color={"primary"}
                      disabled={this.state.disabled}
                    >
                      Add an appointment
                    </Button>
                  </TableCell>
                )}
                {JSON.parse(localStorage.getItem("user")).type === "doctor" && (
                  <TableCell>
                    <Button
                      onClick={() => {
                        
                        this.setState({
                          patient: row,
                          patientAppointmentsOpen: true,
                        });
                      }}
                      color={"primary"}
                    >
                      Appointments
                    </Button>
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    onClick={() => {
                      this.setState({
                        checkupPatient: row,
                        checkupOpen: true,
                      });
                    }}
                    color={"info"}
                    disabled={this.state.disabled}
                  >
                    Checkup
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      this.setState({
                        rowId: row.id,
                        deleteConfirmationOpen: true,
                      });
                    }}
                  >
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
        <PatientAppointments
          open={this.state.patientAppointmentsOpen}
          patient={this.state.patient}
          close={() => {
            this.setState({ patientAppointmentsOpen: false });
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
        <Checkup
          open={this.state.checkupOpen}
          checkupPatient={this.state.checkupPatient}
          close={() => {
            this.setState({ checkupOpen: false });
          }}
        />
        <Pagination
          page={this.state.pageNumber}
          count={
            this.state.patientList.length <= this.state.range
              ? 1
              : Math.ceil(this.state.patientList.length / this.state.range)
          }
          color="primary"
          style={{ position: "absolute", bottom: 10, left: 5 }}
          onChange={(e, p) => this.handlePageChange(p)}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmationOpen}
          close={() => {
            this.setState({ deleteConfirmationOpen: false });
          }}
          function={() => {
            this.deleteUser(this.state.rowId);
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
          for (let i = 0; i < result.data.length; i++) {
            if (JSON.parse(localStorage.getItem("user")).type !== "doctor") {
              let doctor = await getProfileInfo(
                result.data[i].id_doctor,
                JSON.parse(localStorage.getItem("user")).token
              );
              result.data[i].doctor = doctor.data.name;
            }
          }
          this.setState({
            patientList: result.data,
            selectedPatientList: result.data.slice(0, this.state.range),
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
