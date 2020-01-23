import React from 'react';
import { useGrid } from '../../hook/useGrid';
import Container from './Container';
import Slot from './Slot';
import Box from './Box';

export default function Grid({className}){
    const grid = useGrid();
    return <div className={className}>
        {grid.container.map( c=>
            <Container key={c.id} {...c}>
                {c.slots.map((s, slotIndex)=>
                    <Slot key={slotIndex}{...s}>
                        {s.boxes.map(b=>
                            <Box key={b.id} {...b} />
                        )}
                    </Slot>
                )}
            </Container>
        )}
    </div>
}