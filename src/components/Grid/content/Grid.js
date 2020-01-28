import React from 'react';
import { useGrid } from '../../../hook/useGrid';
import Container from './Container';
import { ContainerDroppable, ContainerDraggable } from '../dnd/ContainerDnd';

export default function Grid({className}){
    const grid = useGrid();
    return <div className={className}>
        <ContainerDroppable>
            {grid.container.map( (c, index)=> <ContainerDraggable
            key={c.id}
            containerId={c.id}
            containerIndex={index}>
                <Container  {...c} />
            </ContainerDraggable>)}
        </ContainerDroppable>
    </div>
}