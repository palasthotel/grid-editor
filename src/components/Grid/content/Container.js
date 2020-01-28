import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { colorBorder, colorBlueGrey } from '../../../style/colors';
import Slot from './Slot';
import { getSlotWidth, getSlotDefinitions } from '../../../utils/container-type';

const useContainerStyles = makeStyles({
    container:{
        borderColor: colorBorder,
        marginBottom: 10,
    },
    title:{
        padding: 10,
        minHeight: 25,
        paddingLeft: 25,
        borderBottom: "1px solid "+colorBlueGrey[100],
    },
    slotsWrapper:{
        display: "flex",
    },
    readmore:{
        padding: 10,
        borderTop: "1px solid "+colorBlueGrey[100],
    }
});

export default function Container({
    title, slots, type, readmore
}){
    const classes = useContainerStyles();
    const slotDefinitions = getSlotDefinitions(type);

    return <Paper
        className={classes.container}
        elevation={1}
        variant="outlined"
    >
        <div className={classes.title}>{title}</div>
        <div className={classes.slotsWrapper}>
            {slots.map((slot,index)=>
                <SlotDimension
                    key={slot.id}
                    definition={slotDefinitions[index]}
                >
                    <Slot  {...slot} />
                </SlotDimension>
            )}
        </div>
        <div className={classes.readmore}>
            {readmore} sdf
        </div>
    </Paper>
};

const useSlotDimensionStyles = makeStyles({
    slotDimension: ({width})=>({
        width: width+"%",
        padding: "0 2px",
        "&:last-child":{
            paddingRight: 4,
        },
        "&:first-child":{
            paddingLeft: 4,
        },
    }),
});

const SlotDimension = ({definition, children})=>{
    const classes = useSlotDimensionStyles({
        width: getSlotWidth(definition),
    });
    return <div className={classes.slotDimension}>
        {children}
    </div>
}

