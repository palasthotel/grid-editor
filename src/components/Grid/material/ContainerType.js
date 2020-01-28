import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import {getSlotDefinitions, getSlotWidth} from '../../../utils/container-type';
import { ContainerTypeDraggable } from '../dnd/ContainerDnd';

const useStyles = makeStyles({
    container:{
        position:"relative",
    },
    containerDragHelper:{
        position: "absolute",
        top: 10,
        left: -20,
    },
    containerType:{
        display: "flex",
        marginBottom:10,
    },
    slot:({width})=>({
        position:"relative",
        width: width+"%",
    }),
    slotVisual:{
        border:"1px solid black",
        height: 40,
        margin:2,
        borderRadius: 2,
    }
});

const ContainerSlot = ({definition})=>{
    const classes = useStyles({width: getSlotWidth(definition)});
    return <div className={classes.slot}>
        <div className={classes.slotVisual}></div>
    </div>
};

export default function ContainerType({
    type,
    space_to_left,
    space_to_right,
}){
    const classes = useStyles();
    const sizes = getSlotDefinitions(type);

    return <div className={classes.container}>
        <MoreVertRoundedIcon className={classes.containerDragHelper} />
        <div className={classes.containerType}>
            {space_to_left? <div style={{width: getSlotWidth(space_to_left)+"%" }} />: null}
            {
                sizes
                .filter(s=> s !== "0")
                .map((s, index)=><ContainerSlot key={index} definition={s} />)
            }
            {space_to_right? <div style={{width: getSlotWidth(space_to_right)+"%" }} />: null}
        </div>
    </div>
}