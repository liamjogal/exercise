import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  TextField,
} from "@mui/material";
import { popExercise } from "../../../features/info/infoSlice";
import "rsuite/dist/rsuite.min.css";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import LineChart from "./LineChart";
export default function ExerciseHistory() {
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.id);
  const exercises = useSelector((state) => state.exercises);
  var [graphData, setGraphData] = useState([]);
  const [xs, setXs] = useState([]);
  const [ys, setYs] = useState([]);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  useEffect(() => {
    if (exercises.length > 0) {
      const firstExercise = exercises[0].exercise;
      const firstReps = exercises[0].reps;

      setGraphData(
        exercises.filter(
          (element) =>
            element.exercise === firstExercise && element.reps === firstReps
        )
      );
      let xloc = [];
      let yloc = [];
      for (let elem in exercises) {
        if (!xloc.includes(exercises[elem].exercise)) {
          xloc.push(exercises[elem].exercise);
        }
        if (
          exercises[elem].exercise === firstExercise &&
          !yloc.includes(exercises[elem].reps)
        ) {
          yloc.push(exercises[elem].reps);
        }
      }
      setX(firstExercise);
      setY(firstReps);
      setXs(xloc);
      setYs(yloc);

      console.log(xs);
      console.log(ys);
    } else {
    }
  }, [exercises]);

  const handleXChange = (val) => {
    setX(val.target.value);
    let yloc = [];

    console.log(val);
    for (let elem in exercises) {
      if (
        exercises[elem].exercise === val.target.value &&
        !yloc.includes(exercises[elem].reps)
      ) {
        yloc.push(exercises[elem].reps);
      }
    }
    console.log(yloc);
    setYs(yloc);
  };

  const handleGraphData = (val) => {
    setY(val.target.value);
    console.log(val.target.values);
    console.log(x);
    setGraphData(
      exercises.filter(
        (element) => element.exercise === x && element.reps === val.target.value
      )
    );
    console.log(graphData);
  };

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
            dispatch(popExercise(row));
          }
        },
        (err) => {
          alert(
            `An error was made deleting the exercise. This may have been deleted earlier so try logging back in!`
          );
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
      // type: "singleSelect",

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
          rows={exercises}
          height="100%"
          width="100%"
          // slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <h1 align="Center" padding="100px">
        History Graph
      </h1>
      <Box
        sx={{ flexGrow: 1 }}
        paddingTop="50px"
        paddingBottom="200px"
        m="auto"
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          <Grid item>
            <FormControl>
              <InputLabel id="xAxis-label">Exercise:</InputLabel>
              <Select
                labelId="xAxis-label"
                id="xAxis"
                value={x}
                onChange={(val) => {
                  handleXChange(val);
                }}
                width={"30%"}
              >
                {xs.map((value) => {
                  console.log(value);
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="yAxis-label">Reps:</InputLabel>
              <Select
                labelId="yAxis-label"
                id="yAxis"
                value={y}
                onChange={(val) => {
                  handleGraphData(val);
                }}
                width={"30%"}
              >
                {ys.map((value) => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <LineChart data={graphData}></LineChart>
    </>
  );
}
