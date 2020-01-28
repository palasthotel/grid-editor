import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/styles';
import Toolbars from './Toolbars';
import Grid from './content/Grid';

const useStyles = makeStyles({
    wrapper:{
        border: "1px solid #efefef",
        backgroundColor: "#f5f5f5",
        "& *":{
            fontFamily: "'Open Sans', sans-serif",
        }
    },
    gridContent:(dimensions)=>({
        margin: `0 ${dimensions.materialsPanelWidth}px 0 ${dimensions.actionsPanelWidth}px`,
        padding: "10px 10px 60px 5px",
    }),
});


export default function Root(){

    const dimensions = {
        actionsPanelWidth: 50,
        materialsPanelWidth: 260,
    };

    const classes = useStyles(dimensions);



    return (
        <div className={classes.wrapper}>
            <DragDropContext onDragEnd={(props)=>{
                console.log(props);
            }}>
                <Toolbars
                    {...dimensions}
                />
                <Grid className={classes.gridContent} />
            </DragDropContext>
        </div>
    )
};