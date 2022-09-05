import * as React from "react";
import { Button, Container, Grid } from "@mui/material";
import dayjs from 'dayjs';
import datefns from 'date-fns';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from "@mui/material/Select";
import {InputLabel} from "@mui/material";
import {Box} from "@mui/material";
import {FormControl, MenuItem} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";






// function DatePicker() {
//   const [value, setValue] = React.useState(dayjs(''));

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateTimePicker

//           label="Date&Time picker"
//           value={value}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
//     </LocalizationProvider>
//   );
// }

 const ExcerciseSelector = () => {
    const [excercise, setExcercise] = React.useState('');
  
    const handleChange = (event) => {
      setExcercise(event.target.value);
    };
  
    return (
      <>
          <InputLabel id="select-label">Excercise</InputLabel>
          <Select
            labelId="select-label"
            id="excercise-selector"
            value={excercise}
            label="Excercise"
            onChange={handleChange}
          >
            <MenuItem value={"bench"}>Bench</MenuItem>
            <MenuItem value={"squat"}>Squat</MenuItem>
            <MenuItem value={"deadlift"}>Deadlift</MenuItem>
          </Select>
        </>
 
    );
  }









export default function Exercise() {

    


    const [dateInput, setDate] =  React.useState(dayjs('').format());
    const [exerciseInput, setExercise] = React.useState('');
    const [weightInput, setWeight] = React.useState('');
    const [repsInput, setReps] = React.useState(0);
    const [setsInput, setSets] = React.useState(0);

    const handleExercise = (event) => {
      setExercise(event.target.value);
    };


  




    const handleChange = (event) => {
        switch(event.currentTarget.id){
            case("exercise-input"):

                setExercise(event.target.value);
                console.log(typeof exerciseInput);
                break;

            case("weight-input"):
                setWeight(event.currentTarget.value);
                break;

            case("reps-input"):
                setReps(event.currentTarget.value);
                break;

            case("sets-input"):
                setSets(event.currentTarget.value);
            
        }
    }

    const sendData = () => {
      axios.post("http://localhost:8000/api/entries/", 
      { 
        date: dateInput, 
        exercise: exerciseInput,
        weight: weightInput,
        reps: repsInput,
        sets: setsInput
      })
        // TODO, send all input data to django api
        // axios
    }

    return (
        <>
            <h1>New Exercise</h1>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={dateInput}
                onChange={(newValue) => {
                  setDate(newValue);

                }}
                renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
            <h1></h1>
            <Container alignItems ="center">
            <InputLabel id="select-label">Exercise</InputLabel>
              <Select
                labelId="select-label"
                id="exercise-input"
                value={exerciseInput}
                label="Exercise"
                onChange={handleExercise}
              >
                <MenuItem value={"Bench"} >Bench</MenuItem>
                <MenuItem value={"Squat"} >Squat</MenuItem>
                <MenuItem value={"Deadlift"} >Deadlift</MenuItem>
              </Select>
            </Container>
            <h1></h1>

            <Box
            display="flex"
                alignItems="center"
                justifyContent="center">
            <Stack direction={{xs:"column", sm:"row"}} spacing={{xs:2, sm:2, md:4}} align items="center" alignContent="center">
            <TextField id="weight-input" label="Weight" variant="outlined" onChange={handleChange} />
            <TextField id="reps-input" label="Reps" variant="outlined" onChange={handleChange} input="number"/>
            <TextField id="sets-input" label="Sets" variant="outlined" onChange={handleChange} input="number"/>
            
            </Stack>
            </Box>
            <h1></h1>
            <Button onClick={sendData}>Submit Entry</Button>
            <h1></h1>
            
            
            

           

            
            
        </>        


            
        

        
    );

};





