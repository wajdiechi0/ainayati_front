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
  fetchDoctorList,
  removeUser,
  removeAffect,
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
        removeAffect(
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
          {JSON.parse(localStorage.getItem("user")).type === "patient"
            ? "My Doctors List"
            : "Doctors List"}
        </Typography>
        {JSON.parse(localStorage.getItem("user")).type === "patient" ? (
          <Button
            variant="contained"
            style={{ background: "#9c27b0", color: "#fff" }}
            onClick={() => {
              this.setState({ AffectRequestOpen: true });
            }}
          >
            Send affect request
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ background: "#9c27b0", color: "#fff" }}
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
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">email</TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
                <TableCell align="right">Birthdate</TableCell>
              )}
              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
                <TableCell align="right">Home Address</TableCell>
              )}
              <TableCell align="right">Work Address</TableCell>
              <TableCell align="right">Specialty</TableCell>
              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
                <TableCell align="right">Gender</TableCell>
              )}

              {JSON.parse(localStorage.getItem("user")).type !== "patient" && (
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
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && (
                  <TableCell align="right">{row.birthdate}</TableCell>
                )}
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && (
                  <TableCell align="right">{row.home_address}</TableCell>
                )}
                <TableCell align="right">{row.work_address}</TableCell>
                <TableCell align="right">{row.specialty}</TableCell>
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && (
                  <TableCell align="right">{row.gender}</TableCell>
                )}
                {JSON.parse(localStorage.getItem("user")).type !==
                  "patient" && (
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
          close={() => {
            this.setState({ AffectRequestOpen: false });
          }}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.doctorList && prevProps !== this.props) {
      if (this.props.crudUser.doctorList.code === "0") {
        this.setState({
          doctors: this.props.crudUser.doctorList.data,
        });
        console.log(this.props.crudUser.doctorList.data);
        this.props.crudUser.doctorList = null;
      }
    }
  }
  componentDidMount() {
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
