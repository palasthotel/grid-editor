import React, { useState } from "react"
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { colorBorder, colorBlueGrey, colorLightSurface, colorDarkSurface } from "../../../style/colors";
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Collapsable from "./Collapsable";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
    boxMetaTypeArrow:({isOpen})=>({
        position: "absolute",
        top: 10,
        left: 5,
        transition: "all 137ms ease",
        transform: (isOpen)? "rotate(90deg)": "rotate(0deg)",
    }),
    boxMetaType:{
        position: "relative",
        padding: 10,
        paddingLeft: 30,
        cursor: "pointer",
        fontWeight: "bold",
        borderBottom: "1px solid "+colorBorder,
    },
    boxTypes:{
        borderTop: "1px solid "+colorBorder,
        backgroundColor: colorBlueGrey[100],
        margin: 0,
        padding: 0,
        minHeight: 10,
        "&:last-child":{
            borderBottom: "1px solid "+colorBorder,
        }
    },
    boxType:{
        position: "relative",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        "&:last-child":{
            paddingBottom: 15,
        }
    },
    boxPreview:{
        backgroundColor: colorLightSurface,
        border: "1px solid "+colorBlueGrey[300],
    },
    boxDragger:{
        position: "absolute",
        height: 5,
        width: 5,
        top: 15,
        left: 5,
        color: colorBlueGrey[300],
    },
    boxName:{
        padding: "10px 10px 10px 20px",
    }
})

export const BoxType = ({type})=>{
    const classes = useStyles();
    return <div className={classes.boxType}>
        <div className={classes.boxPreview}>
            <span className={classes.boxDragger}>
                <MoreVertRoundedIcon />
            </span>
            <div className={classes.boxName}>{type}</div>
        </div>
    </div>
}

export const BoxMetaType = ({type, title})=>{
    const [isOpen, setOpen] = useState(true);
    const classes = useStyles({isOpen});
    const boxTypes = useSelector(({box_types}) => box_types[type] || [] );

    // return <Collapsable label={title}>
    //     <Box>
    //         {boxTypes.map(box=> <BoxType key={box.type} {...box} />)}
    //     </Box>
    // </Collapsable>

    return <>
        <div
            className={classes.boxMetaType}
            onClick={()=>setOpen(!isOpen)}
        >
            <ArrowRightRoundedIcon className={classes.boxMetaTypeArrow}/>
            {title}
        </div>
        {!isOpen? null:
            <div className={classes.boxTypes}>
                {boxTypes.map(box=> <BoxType key={box.type} {...box} />)}
            </div>
        }
    </>
}