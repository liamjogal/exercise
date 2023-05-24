import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Box, MenuItem, Grid, TextField } from "@mui/material";
import "rsuite/dist/rsuite.min.css";

import Plot from "react-plotly.js";

import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LineChart from "./LineChart";
export default function ExerciseHistory() {
  const _id = useSelector((state) => state.id);
  const exercises = useSelector((state) => state.exercises);
  console.log(exercises);
  const [data, setData] = useState({});
  var [graphData, handleGraphData] = useState([]);
  if (exercises.length > 0) {
    const firstExericse = exercises[0].exercise;
    const firstReps = exercises[0].reps;
    graphData = exercises.filter(
      (element) =>
        element.exercise === firstExericse && element.reps === firstReps
    );
  } else {
  }

  const deleteOnClick = async (row) => {
    await axios
      .put("http://localhost:4000/removeExercise", {
        id: _id,
        exercise: {
          date: row.date,
          exercise: row.exercise,
          weight: row.weight,
          reps: row.reps,
          sets: row.sets,
          _id: row.id,
        },
      })
      .then(
        (res) => {
          if (res.status === 200) {
            //   window.location.reload(false);
          }
        },
        (err) => {
          alert(`error deleting exercise error: ${err}`);
        }
      );
  };

  const updateOnClick = async (row) => {
    console.log(row);
    await axios
      .put("http://localhost:4000/updateExercise", {
        id: _id,
        exercise: {
          date: row.date,
          exercise: row.exercise,
          weight: row.weight,
          reps: row.reps,
          sets: row.sets,
          _id: row.id,
        },
      })
      .then(
        (res) => {
          if (res.status === 200) {
            //   window.location.reload(false);
          }
        },
        (err) => {
          alert(`error deleting exercise error: ${err}`);
        }
      );
  };
  const [columns] = useState([
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        return moment(params.row.date).format("MM/DD/YYYY");
      },
      editable: true,
    },
    {
      field: "exercise",
      headerName: "Exercise",
      flex: 1,
      type: "singleSelect",
      valueOptions: [],
      editable: true,
    },
    { field: "weight", headerName: "Weight", flex: 1, editable: true },
    { field: "reps", headerName: "Reps", flex: 1, editable: true },
    { field: "sets", headerName: "Sets", flex: 1, editable: true },
    {
      field: "deleteButton",
      headerName: "Delete",
      description: "Delete column.",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button onClick={() => deleteOnClick(params.row)} variant="contained">
            Delete
          </Button>
        );
      },
    },
    {
      field: "updateButton",
      headerName: "Update",
      description: "Update column.",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button onClick={() => updateOnClick(params.row)} variant="contained">
            Update
          </Button>
        );
      },
    },
  ]);

  useEffect(() => {
    setData(exercises);
  }, []);

  return (
    <>
      <h1 align="Center" padding="100px">
        All Exercises
      </h1>
      <Box
        sx={{
          height: 800,
          width: "90%",
          // mb: "10%",
          // mt: "10%",
        }}
        paddingTop="30px"
        paddingBottom="50px"
        m="auto"
      >
        <DataGrid
          columns={columns}
          rows={graphData}
          height="100%"
          width="100%"
        />
      </Box>

      <h1 align="Center" padding="100px">
        History Graph
      </h1>
      <LineChart data={graphData}></LineChart>
    </>
  );
}
