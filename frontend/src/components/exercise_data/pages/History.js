import * as React from "react";
import CustomToolbarGrid from "../components/ExerciseHistory";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

import { Stack } from "@mui/material";
import Exercise from "./Exercise";

export default function History() {
  return (
    <Box sx={{ display: "flex", alignItems: "top", textAlign: "center" }}>
      <Stack width="17%">
        <Button size="large">History</Button>
        <Button size="large">Upload New</Button>
      </Stack>
      <Stack width="83%">
        <CustomToolbarGrid></CustomToolbarGrid>
        <Exercise></Exercise>
      </Stack>
    </Box>
  );
}
