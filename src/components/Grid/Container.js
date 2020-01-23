import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { get_slot_weights } from '../../helper/dimensions';
import { makeStyles } from '@material-ui/styles';
import { colorBorder } from '../../style/colors';

const useStyles = makeStyles({
    container:{
        borderColor: colorBorder,
        marginBottom: 10,
    }
})

export default function Container(props){
    const classes = useStyles();
    const weights = get_slot_weights(props);
    return <Paper
        className={classes.container}
        elevation={1}
        variant="outlined"
    >
        {props.children}
    </Paper>
}