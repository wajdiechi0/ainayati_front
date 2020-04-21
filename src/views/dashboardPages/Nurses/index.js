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
import { fetchNurseList, removeUser } from "./../../../redux/actions";
import AddNurse from "./../Components/AddUser";
import EditNurse from "./../Components/EditUser";
class Nurses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nurses: [],
      idEdit: "",
      editNurse: {},
      addNurseOpen: false,
      editNurseOpen: false
    };
  }

  reloadUserList(filtered) {
    this.setState({
      nurses: filtered
    });
  }

  deleteUser(userId) {
    var filtered = this.state.nurses.filter(value => {
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
          Nurse List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ background: "#9c27b0", color: "#fff" }}
          onClick={() => {
            this.setState({ addNurseOpen: true });
          }}
        >
          Add a nurse
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
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.nurses.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.home_address}</TableCell>
                <TableCell align="right">{row.work_address}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      this.setState({
                        editNurse: row,
                        editNurseOpen: true
                      });
                    }}
                  >
                    {" "}
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
        <AddNurse
          open={this.state.addNurseOpen}
          close={() => {
            this.setState({ addNurseOpen: false });
          }}
          type="nurse"
        />
        <EditNurse
          open={this.state.editNurseOpen}
          close={() => {
            this.setState({ editNurseOpen: false });
          }}
          editUser={this.state.editNurse}
          type="nurse"
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.nurseList && prevProps !== this.props) {
      if (this.props.crudUser.nurseList.code === "0") {
        this.setState({
          nurses: this.props.crudUser.nurseList.data
        });
      }
      this.props.crudUser.nurseList = null;
    }
  }
  componentDidMount() {
    this.props.dispatch(
      fetchNurseList(JSON.parse(localStorage.getItem("user")).token)
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
export default connect(mapStateToProps)(Nurses);
