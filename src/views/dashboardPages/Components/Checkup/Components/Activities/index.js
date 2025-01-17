import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Pagination } from "@material-ui/lab";
import { connect } from "react-redux";
import { fetchPatientActivities } from "../../../../../../redux/actions";

function ActivityComponent(props) {
  const [list, changeList] = useState(null);
  const [selectedList, changeSelectedList] = useState(null);
  const range = 5;
  useEffect(() => {
    props.dispatch(
      fetchPatientActivities(
        props.patientEmail,
        JSON.parse(localStorage.getItem("user")).token
      )
    );
  }, []);
  useEffect(() => {
    let result = props.healthReducer.activities;
    if (result) {
      if (result.code === "0") {
        result.data.sort(function (a, b) {
          return a.date_time > b.date_time
            ? -1
            : a.date_time < b.date_time
            ? 1
            : 0;
        });
        changeList(result.data);
        changeSelectedList(result.data.slice(0, range));
      }
      props.healthReducer.activities = null;
    }
  }, [props.healthReducer.activities]);

  const handlePageChange = (pageNumber) => {
    changeSelectedList(
      list.slice((pageNumber - 1) * range, pageNumber * range)
    );
  };
  return (
    <div>
      {list && list.length !== 0 && (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Activity Type
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Distance(Km)
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Speed(Km/h)
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Duration(Minute)
                </TableCell>
                <TableCell  style={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell >{row.type}</TableCell>
                  <TableCell >{row.distance}</TableCell>
                  <TableCell >{row.speed}</TableCell>
                  <TableCell >{row.duration}</TableCell>
                  <TableCell >{row.date_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            count={list.length <= range ? 1 : Math.ceil(list.length / range)}
            color="primary"
            style={{ position: "absolute", bottom: 10, left: 5 }}
            onChange={(e, p) => handlePageChange(p)}
          />
        </div>
      )}
      {list && list.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "lighter", fontSize: 15, marginTop: 20 }}>
            No activities found for this patient
          </span>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    healthReducer: state.healthReducer,
  };
}

export default connect(mapStateToProps)(ActivityComponent);
