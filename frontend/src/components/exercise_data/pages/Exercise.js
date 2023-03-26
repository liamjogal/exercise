import * as React from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme } from "@mui/material";
import { Grid } from "@mui/material";

const theme = createTheme();

theme.spacing(6);
export default function Exercise() {
  const data = useLocation().state;
  const name = useLocation().state.context.profile.user;
  console.log("username + " + name);
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
        user: name,
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
      <h1 align="left" padding="100px">
        New Exercise
      </h1>
      <Box sx={{ flexGrow: 1 }} paddingTop="50px" paddingBottom="200px">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick a Date"
                ope
                value={dateInput}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      flex: 1,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            {/* <InputLabel id="select-label">Exercise</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="select-label"
                id="exercise-input"
                value={exerciseInput}
                label="Exercise"
                onChange={handleExercise}
                sx={{
                  flex: 1,
                }}
              > */}

            <TextField
              // style={{ width: "100%" }}
              variant="outlined"
              // labelId="select-label"
              id="exercise-input"
              value={exerciseInput}
              label="Exercise"
              onChange={handleExercise}
              sx={{
                width: "200px",
              }}
              select
            >
              <MenuItem value={"Bench"}>Bench</MenuItem>
              <MenuItem value={"Squat"}>Squat</MenuItem>
              <MenuItem value={"Deadlift"}>Deadlift</MenuItem>
            </TextField>

            {/* </Select>
            </FormControl> */}
          </Grid>
          {/* <h1></h1> */}

          {/* <Box display="flex" alignItems="center" justifyContent="center">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2, md: 4 }}
              align
              items="center"
              alignContent="center"
            > */}

          <Grid item>
            <TextField
              id="weight-input"
              label="Weight (lbs)"
              variant="outlined"
              onChange={handleWeight}
              sx={{
                flex: 1,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="reps-input"
              label="Reps"
              variant="outlined"
              onChange={handleReps}
              input="number"
              sx={{
                flex: 1,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="sets-input"
              label="Sets"
              variant="outlined"
              onChange={handleSets}
              input="number"
              sx={{
                flex: 1,
              }}
            />
          </Grid>

          {/* </Stack>
          </Box> */}
          {/* <h1></h1> */}
          <Grid item>
            <Button
              variant="outlined"
              sx={{ color: blue[800], width: "100%", height: "100%" }}
              fullWidth
              max
              onClick={sendData}
            >
              Submit Entry
            </Button>
          </Grid>

          <h1></h1>
          {confirmed && <Confirmation></Confirmation>}
        </Grid>
      </Box>
    </>
  );
}
