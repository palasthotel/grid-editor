import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { colorSurfaceEdit, colorEdit, colorDelete, colorSurfaceDelete } from '../../../style/colors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useIsAltKeyPressed } from '../../../hook/useUiState';

const useControlStyles = makeStyles({
    button:{
        position: "absolute",
        cursor: "pointer",
        width: 50,
        overflow: "hidden",
        transition: "all 137ms ease",
        "&:hover":{
            width: 140,
        }
    },
    icon:{
        position:"absolute",
        top: "50%",
        left: 12,
        marginTop: -12,
    },
    text:{
        position: "absolute",
        top: "50%",
        marginTop: -12,
        left: 45,
        opacity: 0,
        transition: "all 137ms ease",
        "$button:hover &":{
            opacity: 1,
        }
    },
    edit:{
        top: 0,
        right: 0,
        height:"50%",
        backgroundColor: colorSurfaceEdit,
        color: colorEdit,
    },
    duplicate:{
        top: 0,
        right: 0,
        height:"50%",
        backgroundColor: colorSurfaceEdit,
        color: colorEdit,
    },
    delete:{
        bottom: 0,
        right: 0,
        height: "50%",
        backgroundColor: colorSurfaceDelete,
        color: colorDelete,
    },
})

export default function BoxControls({className, onEdit, onDelete, onDuplicate}){
    const isAltKeyPressed = useIsAltKeyPressed();
    const classes = useControlStyles();
    return <div className={className}>
        {!isAltKeyPressed?
            <div className={classes.button+" "+classes.edit} onClick={onEdit}>
                <EditOutlinedIcon className={classes.icon} />
                <span className={classes.text}>Edit</span>
            </div>
            :
            <div className={classes.button+" "+classes.duplicate} onClick={onDuplicate}>
                <FileCopyOutlinedIcon className={classes.icon} />
                <span className={classes.text}>Duplicate</span>
            </div>
        }
        <div className={classes.button+" "+classes.delete} onClick={onDelete}>
            <DeleteOutlineOutlinedIcon className={classes.icon} />
            <span className={classes.text}>Delete</span>
        </div>
    </div>
}