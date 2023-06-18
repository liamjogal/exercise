import * as React from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme } from "@mui/material";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pushExercise } from "../../../features/info/infoSlice";
import ExerciseHistory from "../components/ExerciseHistory";
import { useState } from "react";

const theme = createTheme();

theme.spacing(6);
export default function Exercise() {
  const data = useSelector((state) => state);
  console.log(data);
  const exercises = useSelector((state) => state.exercises);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _id = useSelector((state) => state.id);
  const name = useSelector((state) => state.username);
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
    setWeight(Number(event.currentTarget.value));
  };

  const handleReps = (event) => {
    setReps(Number(event.currentTarget.value));
  };

  const handleSets = (event) => {
    setSets(Number(event.currentTarget.value));
  };

  const Confirmation = () => {
    return <h1>Entry Submitted Successfully</h1>;
  };

  // call to retrieve exercises to get id for datagrid
  // const getExercises = async () => {
  //   await axios.get("http://localhost:4000/exercises").then(
  //     (res) => {
  //       let toset = res.data;
  //       toset.forEach((val) => {
  //         delete Object.assign(val, { id: val._id })["_id"];
  //       });
  //       setExercises
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // };

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
      .post("http://localhost:4000/exercises", {
        id: _id,
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

          // potential implementation is to get all exercises and then dispatch the last one
          // const gotten = await axios.get
          let todispatch = {
            // need to change and be able to figure out how exactly to get the id in mongo db, most likely need to adjust the backend
            id: res.data._id,
            date: dateInput,
            exercise: exerciseInput,
            weight: weightInput,
            reps: repsInput,
            sets: setsInput,
          };
          console.log(dateInput.toString());
          todispatch.date = dateInput.toString();
          todispatch.weight = Number(todispatch.weight);
          todispatch.reps = Number(todispatch.reps);
          todispatch.sets = Number(todispatch.sets);
          //delete Object.assign(todispatch, { id: todispatch._id })["_id"];
          dispatch(pushExercise(todispatch));

          //window.location.reload(false);
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
  };

  return (
    <>
      <h1 align="Center" padding="100px" id="newExercise">
        New Exercise
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick a Date"
                ope
                value={dateInput}
                onChange={(newValue) => {
                  setDate(newValue);
                  console.log(newValue["$d"].toString());
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
            <TextField
              variant="outlined"
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

              <MenuItem value={"Front Squat"}>Front Squat</MenuItem>
              <MenuItem value={"Deadlift"}>Deadlift</MenuItem>
              <MenuItem value={"Clean"}>Clean</MenuItem>
              <MenuItem value={"Power Clean"}>Power Clean</MenuItem>
              <MenuItem value={"Clean and Jerk"}>Clean and Jerk</MenuItem>
              <MenuItem value={"Jerk"}>Jerk</MenuItem>
              <MenuItem value={"Snatch"}>Snatch</MenuItem>
              <MenuItem value={"Power Snatch"}>Power Snatch</MenuItem>
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
              id="newbutton"
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
          {/* {confirmed && <Confirmation></Confirmation>} */}
        </Grid>
      </Box>

      <h1 align="Center" padding="100px" id="newExercise">
        Custom Exercise
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick a Date"
                ope
                value={dateInput}
                onChange={(newValue) => {
                  setDate(newValue);
                  console.log(newValue["$d"].toString());
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
            <TextField
              variant="outlined"
              id="exercise-input"
              value={exerciseInput}
              label="Exercise"
              onChange={handleExercise}
              sx={{
                width: "200px",
              }}
            />

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
              id="custombutton"
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
