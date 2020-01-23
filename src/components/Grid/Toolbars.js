import React, { useState } from 'react';
import {makeStyles} from '@material-ui/styles';
import ActionsPanel, {
    ActionButtonPublish,
    ActionButtonPreview,
    ActionButtonRevert,
    ActionButtonRevisions
} from './ActionPanel';
import { BoxMetaType } from './material/BoxMetaType';
import { useBoxMetaTypes, useContainerTypes } from '../../hook/useMaterial';
import DraftStateHeader from './DraftStateHeader';
import { colorLightSurface, colorBorder } from '../../style/colors';
import {useWindowInnerHeight} from '../../hook/useWindow';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import Collapsable from './material/Collapsable';

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
        width: materialsPanelWidth,
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
    const containerTypes = useContainerTypes();
    const boxMetaTypes = useBoxMetaTypes();
    const [isContainersExpended, setContainersExpended] = useState(true);

    return <div className={classes.toolbar}>
        <DraftStateHeader />
        <ActionsPanel className={classes.actionsPanel}>
                <ActionButtonPublish position={0} />
                <ActionButtonPreview position={1} />
                <ActionButtonRevert position={2} />
                <ActionButtonRevisions position={3} />
        </ActionsPanel>
        <div className={classes.materialsPanel}>
            <Collapsable label="Containers">
                {containerTypes.map(type=><p>{type.type}</p>)}
            </Collapsable>
            {boxMetaTypes.map((metaType)=> <BoxMetaType key={metaType.type} {...metaType} />)}
        </div>
    </div>
}