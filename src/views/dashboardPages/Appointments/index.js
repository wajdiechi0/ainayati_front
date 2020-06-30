import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ShowIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import AppointmentDone from "@material-ui/icons/EventAvailable";
import AppointmentNotDone from "@material-ui/icons/History";
import Tooltip from "@material-ui/core/Tooltip";

import { Pagination } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddAppointment from "../Components/AddAppointment";
import AppointmentRequests from "../Components/AppointmentRequests";
import ResultAlert from "../../authentication/components/alert";
import EditAppointment from "../Components/EditAppointment";
import DeleteConfirmation from "./../../authentication/components/DeleteConfirmation";

import { connect } from "react-redux";
import {
  fetchDoctorAppointments,
  fetchNurseAppointments,
  fetchPatientAppointments,
  removeAppointment,
  getProfileInfo,
  fetchPatientList,
} from "../../../redux/actions";
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentList: [],
      selectedAppointmentList: [],
      selectedAppointmentListFinal: [],
      appointment: {},
      appoointmentRequestsOpen: false,
      editAppointmentOpen: false,
      addAppointmentOpen: false,
      range: 5,
      open: false,
      alertText: "",
      success: true,
      deletingLoading: [],
      fetchLoading: true,
      appId: "",
      pageNumber: 1,
      patients: [],
      fetch: false,
      rowId: 0,
      deleteConfirmationOpen: false,
    };
  }

  deleteAppointment(appId) {
    this.state.deletingLoading[appId] = true;
    this.setState({
      appId,
      deletingLoading: this.state.deletingLoading,
    });
    this.props.dispatch(
      removeAppointment(appId, JSON.parse(localStorage.getItem("user")).token)
    );
  }

  handlePageChange(pageNumber) {
    this.setState({
      pageNumber,
      selectedAppointmentList: this.state.appointmentList.slice(
        (pageNumber - 1) * this.state.range,
        pageNumber * this.state.range
      ),
      fetch: true,
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Appointment List
        </Typography>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#9c27b0", color: "#fff" }}
            onClick={() => {
              this.setState({ addAppointmentOpen: true });
            }}
          >
            {JSON.parse(localStorage.getItem("user")).type === "patient"
              ? "Ask for an appointment"
              : "Add an appointment"}
          </Button>
          {(JSON.parse(localStorage.getItem("user")).type === "nurse" ||
            JSON.parse(localStorage.getItem("user")).type === "doctor") && (
            <Button
              onClick={() => {
                this.setState({ appoointmentRequestsOpen: true });
              }}
              style={{
                marginLeft: "auto",
                background: "#00acc1",
                color: "#fff",
              }}
              color={"primary"}
            >
              Appointment Requests
            </Button>
          )}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                <TableCell style={{ fontWeight: "bold" }}>
                  Doctor name
                </TableCell>
              )}
              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
                <TableCell style={{ fontWeight: "bold" }}>
                  Patient name
                </TableCell>
              )}
              <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
                <TableCell />
              )}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.selectedAppointmentListFinal.map((row) => (
              <TableRow key={row.id}>
                {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                  <TableCell>{row.doctorUser.name}</TableCell>
                )}
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && <TableCell>{row.patientUser.name}</TableCell>}
                <TableCell>
                  {row.state === "false" ? (
                    <Tooltip title="Not done">
                      <AppointmentNotDone />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Done">
                      <AppointmentDone style={{ color: "green" }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      this.setState({
                        appointment: row,
                        editAppointmentOpen: true,
                      });
                    }}
                  >
                    {JSON.parse(localStorage.getItem("user")).type !==
                    "patient" ? (
                      <CreateIcon style={{ color: "#0033cc" }} />
                    ) : (
                      <ShowIcon style={{ color: "#0033cc" }} />
                    )}
                  </IconButton>
                </TableCell>
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && (
                  <TableCell>
                    {this.state.deletingLoading[row.id] ? (
                      <CircularProgress
                        style={{ width: 25, height: 25 }}
                        color="secondary"
                      />
                    ) : (
                      <IconButton
                        onClick={() => {
                          this.setState({
                            appointment: row,
                            rowId: row.id,
                            deleteConfirmationOpen: true,
                          });
                        }}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          style={{
            display: this.state.fetchLoading ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress
            style={{ width: 25, height: 25, marginTop: 50 }}
            color="secondary"
          />
        </div>
        <DeleteConfirmation
          open={this.state.deleteConfirmationOpen}
          close={() => {
            this.setState({ deleteConfirmationOpen: false });
          }}
          function={() => {
            this.deleteAppointment(this.state.rowId);
          }}
        />
        <Pagination
          count={Math.ceil(
            this.state.appointmentList.length / this.state.range
          )}
          color="primary"
          page={this.state.pageNumber}
          style={{ position: "absolute", bottom: 20, left: 10 }}
          onChange={(e, p) => this.handlePageChange(p)}
        />
        <AddAppointment
          open={this.state.addAppointmentOpen}
          patients={this.state.patients}
          close={() => {
            this.setState({ addAppointmentOpen: false });
          }}
        />
        <EditAppointment
          open={this.state.editAppointmentOpen}
          appointment={this.state.appointment}
          close={() => {
            this.setState({ editAppointmentOpen: false });
          }}
          type={JSON.parse(localStorage.getItem("user")).type}
        />
        <AppointmentRequests
          open={this.state.appoointmentRequestsOpen}
          close={() => {
            this.setState({ appoointmentRequestsOpen: false });
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
    if (this.props.blockchain.appointmentList && prevProps !== this.props) {
      let result = this.props.blockchain.appointmentList;
      if (result) {
        result.sort(function (a, b) {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
        this.setState({
          appointmentList: result,
          deletingLoading: this.state.deletingLoading,
          selectedAppointmentList: result.slice(0, this.state.range),
          fetch: true,
        });
        this.props.blockchain.appointmentList = null;
      }
    }

    if (
      prevState.selectedAppointmentList !==
        this.state.selectedAppointmentList &&
      this.state.fetch
    ) {
      const fetchAppointments = async () => {
        let result = this.state.selectedAppointmentList;
        this.setState({
          selectedAppointmentListFinal: [],
          fetchLoading: true,
        });
        for (let i = 0; i < result.length; i++) {
          let doctor = await getProfileInfo(
            result[i].doctor.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          this.state.deletingLoading[result[i].id] = false;
          result[i].doctorUser = doctor.data;
          let patient = await getProfileInfo(
            result[i].patient.split("#")[1],
            JSON.parse(localStorage.getItem("user")).token
          );
          result[i].patientUser = patient.data;
        }
        this.setState({
          selectedAppointmentListFinal: result,
          fetch: false,
          fetchLoading: false,
        });
      };
      fetchAppointments();
    }
    if (this.props.blockchain.removeAppointment && prevProps !== this.props) {
      this.state.deletingLoading[this.state.appId] = false;
      this.setState({
        deletingLoading: this.state.deletingLoading,
      });
      if (this.props.blockchain.removeAppointment.status === 204) {
        switch (JSON.parse(localStorage.getItem("user")).type) {
          case "doctor":
            this.props.dispatch(
              fetchDoctorAppointments(
                JSON.parse(localStorage.getItem("user")).id
              )
            );
            break;

          case "nurse":
            this.props.dispatch(
              fetchPatientList(JSON.parse(localStorage.getItem("user")).token)
            );
            break;

          case "patient":
            this.props.dispatch(
              fetchPatientAppointments(
                JSON.parse(localStorage.getItem("user")).id
              )
            );
            break;
          default:
            break;
        }
        this.setState({
          open: true,
          alertText:
            "You have successfully removed appointment #" +
            this.state.appointment.id,
          success: true,
        });
      } else {
        this.setState({
          open: true,
          alertText: "Error !",
          success: false,
        });
      }
      this.props.blockchain.removeAppointment = null;
    }
    if (this.props.blockchain.editAppointment && prevProps !== this.props) {
      if (this.props.blockchain.editAppointment.status === 200) {
        this.setState({
          open: true,
          alertText:
            "You have successfully updated appointment #" +
            this.state.appointment.id,
          success: true,
          disabled: false,
          pageNumber: 1,
          fetchLoading: true,
          appointmentList: [],
          selectedAppointmentListFinal: [],
          editAppointmentOpen: false,
        });
        if (JSON.parse(localStorage.getItem("user")).type === "nurse") {
          this.props.dispatch(fetchNurseAppointments(this.state.patients));
        } else {
          this.props.dispatch(
            fetchDoctorAppointments(JSON.parse(localStorage.getItem("user")).id)
          );
        }
      }
      this.props.blockchain.editAppointment = null;
    }

    if (this.props.crudUser.patientList && prevProps !== this.props) {
      if (this.props.crudUser.patientList.code === "0") {
        this.props.dispatch(
          fetchNurseAppointments(this.props.crudUser.patientList.data)
        );
        this.setState({
          patients: this.props.crudUser.patientList.data,
        });
      }
      this.props.crudUser.patientList = null;
    }
  }
  componentDidMount() {
    document.title = "Appointments";
    switch (JSON.parse(localStorage.getItem("user")).type) {
      case "doctor":
        this.props.dispatch(
          fetchDoctorAppointments(JSON.parse(localStorage.getItem("user")).id)
        );
        break;

      case "nurse":
        this.props.dispatch(
          fetchPatientList(JSON.parse(localStorage.getItem("user")).token)
        );
        break;

      case "patient":
        this.props.dispatch(
          fetchPatientAppointments(JSON.parse(localStorage.getItem("user")).id)
        );
        break;
      default:
        break;
    }
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

function mapStateToProps(state) {
  return {
    blockchain: state.blockchainReducer,
    crudUser: state.crudReducer,
  };
}
export default connect(mapStateToProps)(Appointments);
