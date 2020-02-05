import React, { memo } from 'react';
import TextWidget from './TextWidget';
import HtmlWidget from './HtmlWidget';
import NumberWidget from './NumberWidget';
import SelectWidget from './SelectWidget';
import { makeStyles } from '@material-ui/core';
import CheckboxWidget from './CheckboxWidget';

const useStyles = makeStyles({
    widget:{
        padding: 20,
    }
})

window.GridEditorWidgets = {};
window.GridEditorWidgets["info"] = ({text})=> <div dangerouslySetInnerHTML={{__html: text}} />
window.GridEditorWidgets["text"] = TextWidget;
window.GridEditorWidgets["number"] = NumberWidget;
window.GridEditorWidgets["html"] = HtmlWidget;
window.GridEditorWidgets["select"] = SelectWidget;
window.GridEditorWidgets["checkbox"] = CheckboxWidget;

const Widget = (props) => {
    const classes = useStyles();
    const {
        onChange,
        contentKey,
    } = props;
    if(
        typeof window.GridEditorWidgets === typeof {}
        &&
        typeof window.GridEditorWidgets[props.type] === "function"
    ){
        const Type = window.GridEditorWidgets[props.type];
        return <div className={classes.widget}>
            <Type {...props} onChange={(value) => onChange(contentKey, value)} />
        </div>
    }
    return <p>Unknown widget type {props.type} with value {props.value}.</p>;
}

export default memo(Widget);