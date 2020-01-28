import React from 'react';
import Box from './Box';
import { makeStyles } from '@material-ui/styles';
import { colorBlueGrey } from '../../../style/colors';

const useStyles = makeStyles({
    slot:{
        minHeight: 120,
        height: "100%",
        backgroundColor: colorBlueGrey[50],
        border: "1px solid "+colorBlueGrey[100],
        borderTop: "none",
        borderBottom: "none",
    },
    boxes:{
        padding: 4,
    }
})

export default function Slot({id, boxes}){
    const classes = useStyles()
    return (
        <div className={classes.slot}>
            <div className={classes.boxes}>
                {boxes.map(box=> <Box key={box.id} {...box} /> )}
            </div>
        </div>
    );
}