import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Plot from "react-plotly.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";

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
            console.log("Excercise deleted");
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
  var first = "";

  useEffect(() => {
    axios
      .get("http://localhost:4000/exercises/", { params: { id: _id } })
      .then((res) => {
        setData([]);
        var i = 0;
        res.data.forEach((val) => {
          console.log("val ");
          console.log(val);
          console.log(i);
          i += 1;
          delete Object.assign(val, { id: val._id })["_id"];

          if (!columns[1].valueOptions.includes(val.exercise)) {
            if (first === "") {
              first = val.exercise;
            }
            columns[1].valueOptions.push(val.exercise);
            graph[val.exercise] = [];
            graph[val.exercise].push({
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
            });
            console.log(
              `Adding ${val.exercise} to options ${columns[1].valueOptions}`
            );
          }

          // graphData = val;
          // date = new Date(val.date);
          graph[val.exercise][0].x.push(val.date.slice(0, 10));
          graph[val.exercise][0].y.push(val.weight);
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
      <h1 align="left">History Graph</h1>

      <TextField
        label="Exercise"
        sx={{
          width: "200px",
        }}
        onChange={(event) => {
          console.log(`Clicked Graph button data below for all graphs`);
          console.log(graph);
          setData(graph[event.target.value]);
        }}
        // value={first}
        select
      >
        {Object.keys(graph).map((key) => (
          <MenuItem value={key}>{key}</MenuItem>
        ))}
      </TextField>

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
    </>
  );
}
