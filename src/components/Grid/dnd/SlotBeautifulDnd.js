import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    draggable:{
        
    }
})

export const BoxTypeDraggable = ({children, boxType, boxIndex}) => {
    return <Draggable type="BOX" draggableId={type} index={boxIndex}>
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

export const BoxDraggable = ({children, boxId, boxIndex}) => {
    return <Draggable type="BOX" draggableId={boxId+""} index={boxIndex}>
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



export const SlotDroppable = ({children, slotId}) => {
    return <Droppable type="BOX" droppableId={slotId+""}>
        {(provided, snapshot)=>{
            return <div ref={provided.innerRef} {...provided.droppableProps}>
                {children}
            </div>
        }}
    </Droppable>
};