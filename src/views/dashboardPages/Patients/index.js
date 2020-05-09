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
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import {
  fetchPatientList,
  removeUser,
  removeAffect,
} from "./../../../redux/actions";
import AddPatient from "../Components/AddUser";
import AffectRequests from "../Components/doctorAffectRequests";
import EditPatient from "../Components/EditUser";
class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      idEdit: "",
      editPatient: {},
      addPatientOpen: false,
      editPatientOpen: false,
      affectRequestsOpen: false,
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
        removeAffect(
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
        <div style={{display: "flex"}}>
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
          <Button
            onClick={() => {
              this.setState({ affectRequestsOpen: true });
            }}
            style={{ marginLeft: "auto", background: "#00acc1", color: "#fff" }}
            color={"primary"}
          >
            Affect Requests
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">Birthdate</TableCell>
              <TableCell align="right">Home Address</TableCell>
              <TableCell align="right">Weight(KG)</TableCell>
              <TableCell align="right">Height(M)</TableCell>
              <TableCell align="right">Gender</TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "doctor" && (
                <TableCell align="right" />
              )}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.patients.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
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
          close={() => {
            this.setState({ affectRequestsOpen: false });
          }}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.patientList && prevProps !== this.props) {
      if (this.props.crudUser.patientList.code === "0") {
        this.setState({
          patients: this.props.crudUser.patientList.data,
        });
      }
      this.props.crudUser.patientList = null;
    }
  }
  componentDidMount() {
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
