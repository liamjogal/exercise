import * as React from "react";
import { Button, Container, Grid } from "@mui/material";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Select} from "@mui/material";
import {InputLabel} from "@mui/material";
import {Box} from "@mui/material";
import {FormControl, MenuItem} from "@mui/material";
import { Stack } from "@mui/system";







function DatePicker() {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}

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

    

    
    const inputs = {
        Date: Date(),
        Excercise: "",
        Weight: 0,
        Reps: 0,
        Sets: 0


    }

    const [date, setDate] = React.useState(Date());
    const [exercise, setExercise] = React.useState("");
    const [weight, setWeight] = React.useState(0);
    const [reps, setReps] = React.useState(0);
    const [sets, setSets] = React.useState(0);



    const handleChange = event => {
        switch(event.currentTarget.id){
            case("date-input"): 
                setDate(event.currentTarget.value);
                break;
            case("exercise-input"):
                setExercise(event.target.value);
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
        // TODO, send all input data to django api
    }

    return (
        <>
            <h1>New Exercise</h1>

            <DatePicker id="date-input" onChange={handleChange}></DatePicker>
            <h1></h1>
            <Container alignItems ="center">
            <ExcerciseSelector id="excercise-input" onChange={handleChange}></ExcerciseSelector>

            </Container>
            <h1></h1>

            <Box
            display="flex"
                alignItems="center"
                justifyContent="center">
            <Stack direction={{xs:"column", sm:"row"}} spacing={{xs:2, sm:2, md:4}} align items="center" alignContent="center">
            <TextField id="weight-input" label="Weight" variant="outlined" onChange={handleChange} value={weight}/>
            <TextField id="reps-input" label="Reps" variant="outlined" onChange={handleChange}/>
            <TextField id="sets-input" label="Sets" variant="outlined" onChange={handleChange}/>
            
            </Stack>
            </Box>
            <h1></h1>
            <Button onClick={sendData}>Submit Entry</Button>
            
            

           

            
            
        </>        


            
        

        
    );

};





