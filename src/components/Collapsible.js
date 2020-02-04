import React, { useState } from 'react';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    label:{
        padding: "15px 0 15px 35px",
        boxSizing: "border-box",
        width: "100%",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "bold",
        borderTop: "1px solid #cdd5df",
        backgroundColor: "#eceae7",
    }
})

export default function Collapsible({label, children, collapsed = true, className}){
    const classes = useStyles();
    const [_collapsed, setCollapsed] = useState(collapsed);

    return <div className={className}>
        <div className={classes.label} onClick={()=>setCollapsed(!_collapsed)}>{label}</div>
        <Collapse in={!_collapsed}>
            {children}
        </Collapse>
    </div>;
}