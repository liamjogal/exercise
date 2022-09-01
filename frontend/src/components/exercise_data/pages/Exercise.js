import * as React from "react";
import { Container, Grid } from "@mui/material";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Select} from "@mui/material";
import {InputLabel} from "@mui/material";
import {Box} from "@mui/material";
import {FormControl, MenuItem} from "@mui/material";



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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </>
 
    );
  }









export default function Exercise() {

    return (
        <>
        {/* <h1>New Exercise</h1>
        <Box justifyContent="center">
            <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}> */}
            <h1>New Exercise</h1>
            <Container>
                {/* <Box
                alignItems="center"
                justifyContent="center"> */}
         
            <DatePicker id="date-input"></DatePicker>
            <ExcerciseSelector id="excercise-input"></ExcerciseSelector>
            <TextField id="weight-input" label="Weight" variant="outlined" />
            <TextField id="reps-input" label="Reps" variant="outlined" />
            <TextField id="sets-input" label="Sets" variant="outlined" />

            {/* </Box> */}
            
            </Container>
            {/* </div>
            </Box> */}
            
        </>        


            
        

        
    );

};





