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
import { fetchDoctorList, removeUser } from "./../../../redux/actions";
import AddDoctor from "../Components/AddUser";
import EditDoctor from "../Components/EditUser";
class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      idEdit: "",
      editDoctor: {},
      addDoctorOpen: false,
      editDoctorOpen: false
    };
  }

  reloadUserList(filtered) {
    this.setState({
      doctors: filtered
    });
  }

  deleteUser(userId) {
    var filtered = this.state.doctors.filter(value => {
      return value.id !== userId;
    });
    this.reloadUserList(filtered);
    this.props.dispatch(
      removeUser(userId, JSON.parse(localStorage.getItem("user")).token)
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Doctor List
        </Typography>
        <Button
          variant="contained"
          style={{ background: "#9c27b0", color: "#fff" }}
          onClick={() => {
            this.setState({ addDoctorOpen: true });
          }}
        >
          Add a doctor
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">Birthdate</TableCell>
              <TableCell align="right">Home Address</TableCell>
              <TableCell align="right">Work Address</TableCell>
              <TableCell align="right">Specialty</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.doctors.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.home_address}</TableCell>
                <TableCell align="right">{row.work_address}</TableCell>
                <TableCell align="right">{row.specialty}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      this.setState({
                        editDoctor: row,
                        editDoctorOpen: true
                      });
                    }}
                  >
                    <CreateIcon style={{ color: "#0033cc" }} />
                  </IconButton>
                </TableCell>
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
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.doctorList && prevProps !== this.props) {
      if (this.props.crudUser.doctorList.code === "0") {
        this.setState({
          doctors: this.props.crudUser.doctorList.data
        });
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
  justifyContent: "center"
};

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer
  };
}
export default connect(mapStateToProps)(Doctors);
