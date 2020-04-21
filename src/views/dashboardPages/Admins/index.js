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
import { fetchAdminList, removeUser } from "./../../../redux/actions";
import AddAdmin from "./../Components/AddUser";
import EditAdmin from "./../Components/EditUser";
class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      idEdit: "",
      editAdmin: {},
      addAdminOpen: false,
      editAdminOpen: false
    };
  }

  reloadUserList(filtered) {
    this.setState({
      admins: filtered
    });
  }

  deleteUser(userId) {
    var filtered = this.state.admins.filter(value => {
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
          Admin List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ background: "#9c27b0", color: "#fff" }}
          onClick={() => {
            this.setState({ addAdminOpen: true });
          }}
        >
          Add an admin
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.admins.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      this.setState({
                        editAdmin: row,
                        editAdminOpen: true
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
        <AddAdmin
          open={this.state.addAdminOpen}
          close={() => {
            this.setState({ addAdminOpen: false });
          }}
          type="admin"
          />
        <EditAdmin
          open={this.state.editAdminOpen}
          close={() => {
            this.setState({ editAdminOpen: false });
          }}
          editUser={this.state.editAdmin}
          type="admin"
          />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.adminList && prevProps !== this.props) {
      if (this.props.crudUser.adminList.code === "0") {
        this.setState({
          admins: this.props.crudUser.adminList.data
        });
      }
      this.props.crudUser.adminList = null;
    }
  }
  componentDidMount() {
    this.props.dispatch(
      fetchAdminList(JSON.parse(localStorage.getItem("user")).token)
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
export default connect(mapStateToProps)(Admins);
