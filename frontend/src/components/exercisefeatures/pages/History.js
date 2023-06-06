import * as React from "react";
import ExerciseHistory from "../components/ExerciseHistory";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

import { Stack } from "@mui/material";
import Exercise from "./Exercise";

export default function History() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      m="auto"
    >
      {/* <Stack width="17%">
        <Button size="large">History</Button>
        <Button size="large">Upload New</Button>
      </Stack> */}
      <Stack width="100%" alignContent={"center"}>
        <ExerciseHistory className="ref1"></ExerciseHistory>
        <Exercise id="newExercise" className="ref2"></Exercise>
      </Stack>
    </Box>
  );
}
