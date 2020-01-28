import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

const BoxDrag = ({boxId})=>{
  const [collectedProps, drag] = useDrag({
    item: { boxId, "BOX" },
  })
  return <div ref={drag}>...</div>
}

const BoxDrop = ()=>{
    const [collectedProps, drop] = useDrop({
        accept,
      });
    return <div ref={drop}>
    </div>
};
