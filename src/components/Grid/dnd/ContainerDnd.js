import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { makeStyles } from '@material-ui/styles';
import { useGrid } from '../../../hook/useGrid';

export const ContainerDroppable = ({children}) => {
    const grid = useGrid();
    return <Droppable type="CONTAINER" droppableId={grid.id+""}>
        {(provided, snapshot)=>{
            return <div ref={provided.innerRef} {...provided.droppableProps}>
                {children}
            </div>
        }}
    </Droppable>
}

const useStyles = makeStyles({
    wrapper:{
        position:"relative",
    },
    handle:{
        position: "absolute",
        top: 10,
        left: 0,
    }
})

export const ContainerDraggable = ({children, containerId, containerIndex}) =>{
    return <Draggable type="CONTAINER" index={containerIndex} draggableId={containerId+""}>
        {(provided, snapshot)=>{
            const classes = useStyles();
            return <div
                className={classes.wrapper}
                ref={provided.innerRef}
                {...provided.draggableProps}
            >
                <div
                    {...provided.dragHandleProps}
                    className={classes.handle}><MoreVertRoundedIcon /></div>
                {children}
            </div>
        }}
    </Draggable>
}

export const ContainerTypeDraggable = ({children, containerType, containerIndex}) => {
    return <Draggable type="CONTAINER" draggableId={containerType} index={containerIndex}>
        {(provided, snapshot)=>{
            return <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {children}
            </div>
        }}
    </Draggable>
}