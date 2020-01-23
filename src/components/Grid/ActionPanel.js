import React from 'react';
import {makeStyles} from '@material-ui/styles';
import PublishIcon from '@material-ui/icons/DoneAllOutlined';
import PreviewIcon from '@material-ui/icons/VisibilityOutlined';
import RevertIcon from '@material-ui/icons/RefreshOutlined';
import RevisionsIcon from '@material-ui/icons/HistoryOutlined';
import {
    colorDraft, colorDarkSurface, colorOnDarkSurface, colorOnLightSurface
} from '../../style/colors';

const useStyles = makeStyles({
    actionPanel:{
        position:"relative",
    },
    actionElement: ({position, size = 45}) => ({
        position: "absolute",
        top: position*size,
        transition: "all 137ms ease-in-out",
        cursor: "pointer",
        width: size,
        height: size,
        overflowX: "hidden",
        "&:hover":{
            width: 140,
        }
    }),
    actionButton:{
        position: "absolute",
        transition: "all 137ms ease",
        top: 0,
        right: 0,
        bottom: 0,
        width: 150,
        backgroundColor: "transparent",
        textAlign: "right",
        color: colorOnLightSurface,
        "&:hover":{
            color: colorOnDarkSurface,
            backgroundColor: colorDarkSurface,
        },
        "& .label":{
            color: colorOnDarkSurface,
            position: "absolute",
            top: 10,
            right: 50,
            transition: "all 137ms ease",
        },
        "&:hover .label":{
            right: 42,
        },
        "& .icon":{
            position: "absolute",
            top: 12,
            right: 12,
        }
    },
    actionButtonPublish:{
        color: colorOnDarkSurface,
        backgroundColor: colorDraft,
        "&:hover":{
            backgroundColor: colorDraft,
        }
    },
});

export const ActionButtonPublish = (props)=>{
    const {actionButtonPublish} = useStyles(props);
    const handleOnClick = ()=>{
    }
    return <ActionElement
        {...props}
        className={actionButtonPublish}
        onClick={handleOnClick}
        icon={<PublishIcon fontSize="small" />}
        >
            Publish
    </ActionElement>
}

export const ActionButtonPreview = (props)=>{
    const {actionButtonPreview} = useStyles(props);
    const handleOnClick = ()=>{
    }
    return <ActionElement
        {...props}
        className={actionButtonPreview}
        onClick={handleOnClick}
        icon={<PreviewIcon fontSize="small" />}
        >
            Preview
    </ActionElement>
}

export const ActionButtonRevert = (props)=>{
    const {actionButtonRevert} = useStyles(props);
    const handleOnClick = ()=>{
    }
    return <ActionElement
        {...props}
        className={actionButtonRevert}
        onClick={handleOnClick}
        icon={<RevertIcon fontSize="small" />}
        >
            Revert
    </ActionElement>
}

export const ActionButtonRevisions = (props)=>{
    const {actionButtonRevisions} = useStyles(props);
    const handleOnClick = ()=>{
    }
    return <ActionElement
        {...props}
        className={actionButtonRevisions}
        onClick={handleOnClick}
        icon={<RevisionsIcon fontSize="small" />}
        >
            Revisions
    </ActionElement>
}

export const ActionElement = ({
    position, size,
    children,
    icon,
    onClick,
    className = ""
}) => {
    const {actionElement, actionButton} = useStyles({position, size});
    return <div className={`${actionElement}`}>
        <div className={`${actionButton} ${className}`} onClick={onClick}>
            <span className="label">{children}</span><span className="icon">{icon}</span>
        </div>
    </div>
}

export default function ActionsPanel(props){
    const classes = useStyles();
    return <div className={props.className+" "+classes.actionPanel}>
            {props.children}
    </div>
}