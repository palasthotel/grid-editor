import React from 'react';
import {makeStyles} from '@material-ui/styles';
import ActionsPanel, {
    ActionButtonPublish,
    ActionButtonPreview,
    ActionButtonRevert,
    ActionButtonRevisions
} from './ActionPanel';
import { BoxMetaType } from './material/BoxMetaType';
import { useBoxMetaTypes, useContentContainerTypes } from '../../hook/useMaterial';
import DraftStateHeader from './DraftStateHeader';
import {useWindowInnerHeight} from '../../hook/useWindow';
import Collapsable from './material/Collapsable';
import ContainerType from './material/ContainerType';
import { Droppable } from 'react-beautiful-dnd';
import { ContainerTypeDraggable } from './dnd/ContainerDnd';

const useStyles = makeStyles({
    toolbar:{
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    actionsPanel:({actionsPanelWidth})=>({
        position:"absolute",
        left: 0,
        width: actionsPanelWidth,
    }),
    materialsPanel:({materialsPanelWidth, windowInnerHeight})=>({
        position:"absolute",
        right: 0,
        width: materialsPanelWidth - 4,
        padding:4,
        paddingTop: 10,
        // backgroundColor: colorLightSurface,
        // borderLeft: "1px solid "+colorBorder,
        // borderBottom: "1px solid "+colorBorder,
        // borderBottomLeftRadius: 2,
        height: windowInnerHeight - 20,
        overflowY: "scroll",
    }),
});

export default function Toolbars({actionsPanelWidth, materialsPanelWidth}){
    const windowInnerHeight =  useWindowInnerHeight();
    console.log(window.innerHeight, windowInnerHeight);
    const classes = useStyles({
        actionsPanelWidth,
        materialsPanelWidth,
        windowInnerHeight,
    });
    const containerTypes = useContentContainerTypes();
    const boxMetaTypes = useBoxMetaTypes();

    return <div className={classes.toolbar}>
        <DraftStateHeader />
        <ActionsPanel className={classes.actionsPanel}>
                <ActionButtonPublish position={0} />
                <ActionButtonPreview position={1} />
                <ActionButtonRevert position={2} />
                <ActionButtonRevisions position={3} />
        </ActionsPanel>
        <div className={classes.materialsPanel}>
            <div style={{marginBottom: 10}}>
                <Collapsable label="Containers">
                    <Droppable droppableId="content-container-types" isDropDisabled={true}>{(provided, snapshot)=>{
                        return <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                        {
                            containerTypes
                            .map((containerType, index)=>
                                <ContainerTypeDraggable
                                    key={containerType.type}
                                    containerType={containerType.type}
                                    containerIndex={index}
                                >
                                    <ContainerType {...containerType} />
                                </ContainerTypeDraggable>
                            )
                        }
                        </div>
                    }}
                    </Droppable>
                </Collapsable>
                <Collapsable label="Reusable Containers">
                    <p>REUSE ME</p>
                </Collapsable>
            </div>
            <div>
                {boxMetaTypes.map((metaType)=> <BoxMetaType key={metaType.type} {...metaType} />)}
            </div>
        </div>
    </div>
}