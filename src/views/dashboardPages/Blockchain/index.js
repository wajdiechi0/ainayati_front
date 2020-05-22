import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Pagination } from "@material-ui/lab";

import { connect } from "react-redux";
import {
  blockchainHistory,
  fetchDoctorsBlockchainTransactions,
} from "../../../redux/actions";
import DoctorTransactions from "../Components/DoctorTransactions";

class BlockchainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      doctorTransactionsOpen: false,
      selectedHistory: [],
      range: 5,
    };
  }
  handlePageChange(pageNumber) {
    this.setState({
      selectedHistory: this.state.history.slice(
        (pageNumber - 1) * this.state.range,
        pageNumber * this.state.range
      ),
    });
  }
  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Blockchain history
        </Typography>
        <Button
          variant="contained"
          style={{ background: "#9c27b0", color: "#fff", marginTop: 30 }}
          onClick={() => {
            this.props.dispatch(fetchDoctorsBlockchainTransactions());
            this.setState({ doctorTransactionsOpen: true });
          }}
        >
          Search Doctor transactions
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Transaction ID
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Transaction type
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Transaction date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.selectedHistory.map((row) => (
              <TableRow key={row.transactionId}>
                <TableCell component="th" scope="row">
                  {row.transactionId}
                </TableCell>
                <TableCell align="right">{row.transactionType}</TableCell>
                <TableCell align="right">{row.transactionTimestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DoctorTransactions
          open={this.state.doctorTransactionsOpen}
          close={() => {
            this.setState({ doctorTransactionsOpen: false });
          }}
        />

        <Pagination
          count={Math.ceil(this.state.history.length / this.state.range)}
          color="primary"
          style={{ position: "absolute", bottom: 20, left: 10 }}
          onChange={(e, p) => this.handlePageChange(p)}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.blockchainReducer.blockchainHistory &&
      prevProps !== this.props
    ) {
      this.props.blockchainReducer.blockchainHistory.sort(function (a, b) {
        return a.transactionTimestamp > b.transactionTimestamp
          ? -1
          : a.transactionTimestamp < b.transactionTimestamp
          ? 1
          : 0;
      });
      this.props.blockchainReducer.blockchainHistory.map((val) => {
        val.transactionTimestamp = val.transactionTimestamp
          .slice(0, 19)
          .replace("T", " ");
        return val;
      });
      this.setState({
        history: this.props.blockchainReducer.blockchainHistory,
        selectedHistory: this.props.blockchainReducer.blockchainHistory.slice(
          0,
          this.state.range
        ),
      });

      this.props.blockchainReducer.blockchainHistory = null;
    }
  }
  componentDidMount() {
    document.title = "Blockchain history";
    this.props.dispatch(blockchainHistory());
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

function mapStateToProps(state) {
  return {
    blockchainReducer: state.blockchainReducer,
  };
}
export default connect(mapStateToProps)(BlockchainComponent);
