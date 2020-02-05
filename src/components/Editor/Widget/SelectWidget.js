import React, { useRef, useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper:{
        width: "100%",
    },
    label:{
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "white",
    }
})

export default function SelectWidget({ label, value, onChange, selections}){

    const classes = useStyles();

    return <FormControl variant="outlined" className={classes.wrapper}>
        <InputLabel className={classes.label}>{label}</InputLabel>
        <Select
            native
            value={value}
            onChange={(e)=>onChange(e.target.value)}
        >
            {selections.map(({key, text}) => <option key={key} value={key}>{text}</option>)}
        </Select>
  </FormControl>
}