import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { get_slot_weights } from '../../helper/dimensions';

export default function Container(props){
    console.log(props);
    const weights = get_slot_weights(props);
    console.log("weights",weights);
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    {props.children}
                </Paper>
            </Grid>
        </Grid>
    )
}