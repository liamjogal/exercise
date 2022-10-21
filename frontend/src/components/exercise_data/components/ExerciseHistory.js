import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

// TODO: Figure out why this is here and if it is needed
// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

export default function CustomToolbarGrid() {
  const columns = [
    { field: "date", headerName: "Date", width: 300 },
    { field: "exercise", headerName: "Exercise", width: 300 },
    { field: "weight", headerName: "Weight", width: 300 },
    { field: "reps", headerName: "Reps", width: 300 },
    { field: "sets", headerName: "Sets", width: 300 },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/entries/").then((res) => {
      //setData(res.data);
      console.log(res);
      for (const key in res.data) {
        //console.log(data[key]);

        res.data[key]["date"] = moment(res.data[key]["date"]).format(
          "MM/DD/YYYY @ hh:mm A"
        );
      }
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid columns={columns} rows={data} />
    </div>
  );
}
