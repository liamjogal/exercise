import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
} from "@mui/x-data-grid";
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
          if (res.status == 200) {
            console.log("Excercise deleted");
            window.location.reload(false);
          }
        },
        (err) => {
          alert(`error deleting exercise error: ${err}`);
        }
      );
  };
  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "exercise",
      headerName: "Exercise",
      width: 200,
      type: "singleSelect",
      valueOptions: ["Squat", "Deadlift", "Bench"],
    },
    { field: "weight", headerName: "Weight", width: 200 },
    { field: "reps", headerName: "Reps", width: 200 },
    { field: "sets", headerName: "Sets", width: 200 },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 200,
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
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/exercises/", { params: { id: _id } })
      .then((res) => {
        res.data.forEach((val) => {
          delete Object.assign(val, { id: val._id })["_id"];
          if (val.date != null)
            val.date = moment(val.date).format("MM/DD/YYYY @ hh:mm A");

          console.log(val);
        });

        setRows(res.data);
        console.log(`rows ${rows}`);
      });
  }, [useLocation().state.added]);

  return (
    <div style={{ height: 800, width: "90%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        height="100%"
        width="100%"
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: "Exercise",
                  operatorValue: "equals",
                  value: "Squat",
                },
              ],
            },
          },
        }}
      />
    </div>
  );
}
