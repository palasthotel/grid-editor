import React, { useState } from "react"
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';


export default function Collapsable({label, children, expanded=false}){
    const [_expanded, setExpanded] = useState(expanded);
    return  <ExpansionPanel
        elevation={1}
        expanded={_expanded}
        onChange={()=>setExpanded(!_expanded)}
        >
        <ExpansionPanelSummary
        expandIcon={<ArrowDropDownRoundedIcon />}
        >
            {label}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: "block"}}>
            {children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
}