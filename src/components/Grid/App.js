import React from 'react';
import {useSelector} from 'react-redux';
import {Tabs, Tab, Grid} from '@material-ui/core';
import DraftStateHeader from './DraftStateHeader';
import Container from './Container';
import Slot from './Slot';
import Box from './Box';
import ActionsPanel from './ActionsPanel';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
})

export default function App(){
    const classes = useStyles();
    const grid = useSelector(state => state.grid);
    return (
        <div>
            <DraftStateHeader />
            <Grid container>
                <Grid item xs={1}>
                    <ActionsPanel>
                        <p>✅</p>
                    </ActionsPanel>
                </Grid>
                <Grid item xs={8}>
                    {grid.container.map(c=>{
                        return <Container key={c.id} {...c}>
                            {c.slots.map((s, slotIndex)=>{
                                return <Slot key={slotIndex} {...s}>
                                    {s.boxes.map(b=>{
                                        return <Box key={b.id} {...b} />
                                    })}
                                </Slot>
                            })}
                        </Container>
                    })}
                </Grid>
                <Grid item xs={4}>
                    <Tabs></Tabs>
                </Grid>
            </Grid>
        </div>
    )
};