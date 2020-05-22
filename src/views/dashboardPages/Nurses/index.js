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
import { fetchNurseList, removeUser ,removeAffectDoctorNurse} from "./../../../redux/actions";
import AddNurse from "./../Components/AddUser";
import AffectRequests from "../Components/doctorAffectRequests";
import EditNurse from "./../Components/EditUser";
class Nurses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nurses: [],
      idEdit: "",
      editNurse: {},
      addNurseOpen: false,
      editNurseOpen: false,
      affectRequestsOpen: false,
    };
  }

  reloadUserList(filtered) {
    this.setState({
      nurses: filtered,
    });
  }

  deleteUser(userId) {
    var filtered = this.state.nurses.filter((value) => {
      return value.id !== userId;
    });
    this.reloadUserList(filtered);

    if (JSON.parse(localStorage.getItem("user")).type === "doctor") {
      this.props.dispatch(
        removeAffectDoctorNurse(
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
          Nurse List
        </Typography>
        <div style={{ display: "flex", marginTop: 30 }}>
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
                Name
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                email
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Birthdate
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Home Address
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Work Address
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Gender
              </TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.nurses.map((row) => (
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
                        editNurseOpen: true,
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
        <AffectRequests
          open={this.state.affectRequestsOpen}
          type="nurse"
          close={() => {
            this.setState({ affectRequestsOpen: false });
          }}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.crudUser.nurseList && prevProps !== this.props) {
      if (this.props.crudUser.nurseList.code === "0") {
        this.setState({
          nurses: this.props.crudUser.nurseList.data,
        });
      }
      this.props.crudUser.nurseList = null;
    }
  }
  componentDidMount() {
    document.title = "Nurses";
    this.props.dispatch(
      fetchNurseList(JSON.parse(localStorage.getItem("user")).token)
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
export default connect(mapStateToProps)(Nurses);
