import React, { useState, useEffect } from "react";
import axios from "axios";
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
    { field: "date", headerName: "Date", width: 150 },
    { field: "exercise", headerName: "Exercise", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "reps", headerName: "Reps", width: 150 },
    { field: "sets", headerName: "Sets", width: 150 },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/entries/").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  // "http://localhost:8000/api/entries/"

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid columns={columns} rows={data} />
    </div>
  );
}
