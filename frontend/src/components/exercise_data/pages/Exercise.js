import * as React from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { Box } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Exercise() {
  const navigate = useNavigate();
  const data = useLocation().state;
  const num = useLocation().state.added;
  const [dateInput, setDate] = React.useState(null);
  const [exerciseInput, setExercise] = React.useState(null);
  const [weightInput, setWeight] = React.useState(null);
  const [repsInput, setReps] = React.useState(null);
  const [setsInput, setSets] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const handleExercise = (event) => {
    setExercise(event.target.value);
  };

  const handleWeight = (event) => {
    setWeight(event.currentTarget.value);
  };

  const handleReps = (event) => {
    setReps(event.currentTarget.value);
  };

  const handleSets = (event) => {
    setSets(event.currentTarget.value);
  };

  const Confirmation = () => {
    return <h1>Entry Submitted Successfully</h1>;
  };

  const sendData = async () => {
    if (
      dateInput == null ||
      exerciseInput == null ||
      weightInput == null ||
      repsInput == null ||
      setsInput == null
    ) {
      alert("Input all data before submitting");
      return;
    }
    await axios
      .put("http://localhost:4000/newExercise", {
        id: data.id,
        exercise: {
          date: dateInput,
          exercise: exerciseInput,
          weight: weightInput,
          reps: repsInput,
          sets: setsInput,
        },
      })
      .then(
        (res) => {
          console.log(res);
          setConfirmed(true);
          window.location.reload(false);
        },
        (err) => {
          // Will be an error if in 10000 or more than more than 2 decimal points
          console.log(err);
          alert(
            "Error submitting excercise. Check to make sure inputs are formatted correctly"
          );
          setConfirmed(false);
        }
      );

    // TODO use then to handle api req error
    // axios
  };

  return (
    <>
      <h1>New Exercise</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Pick a Date"
          value={dateInput}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <h1></h1>
      <Container alignItems="center">
        <InputLabel id="select-label">Exercise</InputLabel>
        <Select
          labelId="select-label"
          id="exercise-input"
          value={exerciseInput}
          label="Exercise"
          onChange={handleExercise}
        >
          <MenuItem value={"Bench"}>Bench</MenuItem>
          <MenuItem value={"Squat"}>Squat</MenuItem>
          <MenuItem value={"Deadlift"}>Deadlift</MenuItem>
        </Select>
      </Container>
      <h1></h1>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 2, md: 4 }}
          align
          items="center"
          alignContent="center"
        >
          <TextField
            id="weight-input"
            label="Weight (lbs)"
            variant="outlined"
            onChange={handleWeight}
          />
          <TextField
            id="reps-input"
            label="Reps"
            variant="outlined"
            onChange={handleReps}
            input="number"
          />
          <TextField
            id="sets-input"
            label="Sets"
            variant="outlined"
            onChange={handleSets}
            input="number"
          />
        </Stack>
      </Box>
      <h1></h1>
      <Button sx={{ color: blue[800] }} onClick={sendData}>
        Submit Entry
      </Button>

      <h1></h1>
      {confirmed && <Confirmation></Confirmation>}
    </>
  );
}
