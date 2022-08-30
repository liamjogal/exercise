import * as React from "react";
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';









export default function Exercise() {

    return (
        <Grid>
            <h1>New Exercise</h1>
            <TextField id="date-input" label="Date" variant="outlined" />  {/* TODO: Change later to calendar component */}
            <TextField id="exercise-input" label="Exercise" variant="outlined" />
            <TextField id="weight-input" label="Weight" variant="outlined" />
            <TextField id="reps-input" label="Reps" variant="outlined" />
            <TextField id="sets-input" label="Sets" variant="outlined" />
        </Grid>
        


            
        

        
    );

};





