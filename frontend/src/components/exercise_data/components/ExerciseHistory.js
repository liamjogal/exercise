import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Box, MenuItem, Grid, TextField } from "@mui/material";
import "rsuite/dist/rsuite.min.css";

import Plot from "react-plotly.js";

import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

export default function CustomToolbarGrid() {
  const _id = useLocation().state.id;
  const [rows, setRows] = useState([]);

  const onButtonClick = async (e, row) => {
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
            window.location.reload(false);
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
        return moment(params.row.date).format("MM/DD/YYYY @ hh:mm A");
      },
    },
    {
      field: "exercise",
      headerName: "Exercise",
      flex: 1,
      type: "singleSelect",
      valueOptions: [],
    },
    { field: "weight", headerName: "Weight", flex: 1 },
    { field: "reps", headerName: "Reps", flex: 1 },
    { field: "sets", headerName: "Sets", flex: 1 },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ]);

  var [graph, setGraph] = useState({});
  var [data, setData] = useState([]);
  var [reps, setReps] = useState([]);
  var first = "";

  useEffect(() => {
    axios
      .get("http://localhost:4000/exercises/", { params: { id: _id } })
      .then((res) => {
        setData([]);
        var i = 0;
        res.data.forEach((val) => {
          i += 1;
          delete Object.assign(val, { id: val._id })["_id"];

          if (!columns[1].valueOptions.includes(val.exercise)) {
            if (first === "") {
              first = val.exercise;
            }
            columns[1].valueOptions.push(val.exercise);
            graph[val.exercise] = {};
          }

          if (!Object.keys(graph[val.exercise]).includes(String(val.reps))) {
            graph[val.exercise][val.reps] = [
              {
                x: [],
                y: [],
                type: "scatter",
                transforms: [
                  {
                    type: "sort",
                    target: "x",
                    order: "ascending",
                  },
                ],
                y0: 0,
              },
            ];
          }

          // want the greatest weight for each rep on a given data in graph data
          var setit = true;
          console.log("length " + graph[val.exercise][val.reps][0].x.length);
          console.log(graph[val.exercise][val.reps][0].x);

          for (
            let indx = 0;
            indx < graph[val.exercise][val.reps][0].x.length;
            indx += 1
          ) {
            if (
              val.date.slice(0, 10) ==
                graph[val.exercise][val.reps][0].x[indx] &&
              val.weight > graph[val.exercise][val.reps][0].y[indx]
            ) {
              graph[val.exercise][val.reps][0].y[indx] = val.weight;
              setit = false;
              break;
            }
          }
          if (setit) {
            graph[val.exercise][val.reps][0].x.push(val.date.slice(0, 10));
            graph[val.exercise][val.reps][0].y.push(val.weight);
            console.log(graph[val.exercise][val.reps][0]);
          }
        });

        setRows(res.data);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 800,
          width: "90%",
          mb: "10%",
          mt: "10%",
        }}
        paddingBottom="50px"
      >
        <DataGrid columns={columns} rows={rows} height="100%" width="100%" />
      </Box>

      <h1 align="left" padding="100px">
        History Graph
      </h1>
      <Box sx={{ flexGrow: 1 }} paddingTop="50px" paddingBottom="200px">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <TextField
              label="Exercise"
              sx={{
                width: "200px",
              }}
              onChange={(event) => {
                setReps(graph[event.target.value]);
                setData([]);
              }}
              // value={first}
              select
            >
              {Object.keys(graph).map((key) => (
                <MenuItem value={key}>{key}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              label="Reps"
              sx={{
                width: "200px",
              }}
              onChange={(event) => {
                setData(reps[event.target.value]);
              }}
              //value={first}
              select
            >
              {Object.keys(reps).map((key) => (
                <MenuItem value={key}>{key}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Plot
              align="left"
              data={data}
              layout={{
                // width: 500,
                // height: 500,

                xaxis: { tickformat: "%B %d", dtick: 24 * 60 * 60 * 1000 },
                font_family: "Roboto",
              }}
              // yaxis={{ range: [0, Math.max(data.y)] }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
