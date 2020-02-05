import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    textField:{
        width: "100%",
    }
}));

export default function TextWidget({value, onChange, label}){
    const classes = useStyles();
    return  <TextField
        className={classes.textField}
        label={label}
        variant="outlined"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
    />
}