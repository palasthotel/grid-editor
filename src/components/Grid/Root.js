import React from 'react';
import {useSelector} from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import MaterialBox from '@material-ui/core/Box';
import DraftStateHeader from './DraftStateHeader';
import Container from './Container';
import Slot from './Slot';
import Box from './Box';
import ActionsPanel, { ActionElement, ActionButtonPublish, ActionButtonPreview, ActionButtonRevert, ActionButtonRevisions } from './ActionPanel';
import {makeStyles} from '@material-ui/styles';
import { BoxMetaType } from './material/BoxType';
import { colorLightSurface } from '../constants/colors';

const useStyles = makeStyles({
    wrapper:{
        border: "1px solid #efefef",
        backgroundColor: "#f3f5f7",
        "& *":{
            fontFamily: "'Open Sans', sans-serif",
        }
    },
    gridActions:{
        width: 50,
        flexGrow:0,
    },
    gridContent:{
        flexGrow:1,
        paddingBottom: 60,
    },
    gridMaterial:{
        width: 260,
        flexGrow:0,
        backgroundColor: colorLightSurface,
        borderLeft: "1px solid #efefef",
    },
})

export default function Root(){
    const classes = useStyles();
    const grid = useSelector(state => state.grid);
    const boxMetaTypes = useSelector(state => state.box_meta_types);
    return (
        <div className={classes.wrapper}>
            <DragDropContext>
                <DraftStateHeader />
                <Grid container>
                    <Grid item className={classes.gridActions}>
                        <ActionsPanel>
                            <ActionButtonPublish position={0} />
                            <ActionButtonPreview position={1} />
                            <ActionButtonRevert position={2} />
                            <ActionButtonRevisions position={3} />
                        </ActionsPanel>
                    </Grid>
                    <Grid item className={classes.gridContent}>
                        <MaterialBox p={2}>
                        {grid.container.map(c=>{
                            return <Container key={c.id} {...c}>
                                {c.slots.map((s, slotIndex)=>{
                                    return <Slot key={slotIndex}{...s}>
                                        {s.boxes.map(b=>{
                                            return <Box key={b.id} {...b} />
                                        })}
                                    </Slot>
                                })}
                            </Container>
                        })}
                        </MaterialBox>
                    </Grid>
                    <Grid item className={classes.gridMaterial}>
                        {boxMetaTypes.map((metaType)=>{
                            return <BoxMetaType key={metaType.type} {...metaType} />;
                        })}
                    </Grid>
                </Grid>
            </DragDropContext>
        </div>
    )
};