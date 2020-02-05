import React, { useState, useCallback } from 'react';
import { useGridBox } from '../../hook/useGrid';
import { TextField } from '@material-ui/core';
import { useIsLoading } from '../../hook/useUi';
import ActionsPanel, { ActionButtonSave, ActionButtonCancel } from '../Grid/ActionPanel';
import { makeStyles } from '@material-ui/styles';
import { colorLightSurface } from '../../style/colors';
import Collapsible from '../Collapsible';
import HtmlWidget from './Widget/HtmlWidget';
import Widget from './Widget';

const useStyles = makeStyles(theme => ({
    wrapper:{
        margin: "0 0 0 60px",
        paddingBottom: 40,
        paddingTop: 40,
    },
    actions:{
        left: -60,
    },
    editor:{
        maxWidth: 800,
        margin: "0 auto",
        backgroundColor: colorLightSurface,
        paddingTop: 20,
        paddingBottom: 20,
    },
    section:{
        padding: 10,
    },
    contentSection:{
        paddingLeft: 0,
        paddingRight: 0,
    },
    textField:{
        width: "100%",
    }
}));

export const Editor = ({
    box,
    onSave, onCancel,
}) => {
    const classes = useStyles();
    const {
        id, type,
        title, titleurl,
        readmore, readmoreurl,
        content,
        prolog, epilog
    } = box;
    const [_title, setTitle] = useState(title);
    const [_titleurl, setTitleUrl] = useState(titleurl);
    const [_readmore, setReadmore] = useState(readmore);
    const [_readmoreurl, setReadmoreUrl] = useState(readmoreurl);
    const [_prolog, setProlog] = useState(prolog);
    const [_content, setContent] = useState(content);
    const [_epilog, setEpilog] = useState(epilog);
    const handleOnSave = ()=>{
        onSave({
            ...box,
            title:_title,
            readmore: _readmore,
        });
    };

    const handleContentChange = useCallback((key, value)=>{
        setContent({
            ..._content,
            [key]: value,
        });
    }, []);

    return <div className={classes.wrapper}>

        <ActionsPanel className={classes.actions}>
            <ActionButtonSave
            onClick={handleOnSave}
            position={0}
            />
            <ActionButtonCancel
            onClick={onCancel}
            position={1}
            />
        </ActionsPanel>

        <div className={classes.editor}>
            <p>{id} Box type: {type}</p>
            <div className={classes.section}>
                <TextField
                    className={classes.textField}
                    label="Title"
                    variant="outlined"
                    value={_title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className={classes.section+" "+classes.contentSection}>
                <Collapsible label={"Prolog"}>
                    <HtmlWidget
                        value={_prolog}
                        onChange={setProlog}
                    />
                </Collapsible>
                <Collapsible label={"Box specific settings"}>
                    {box.contentstructure.map((item, index)=>{
                        return <Widget
                            key={item.key || index}
                            {...item}
                            contentKey={item.key || index}
                            value={_content[item.key]}
                            onChange={handleContentChange}
                        />
                    })}
                </Collapsible>
                <Collapsible label={"Epilog"}>
                <HtmlWidget
                    value={_epilog}
                    onChange={setEpilog}
                />
                </Collapsible>
            </div>
            <div className={classes.section}>
                <TextField
                    className={classes.textField}
                    label="Readmore"
                    variant="outlined"
                    value={_readmore}
                    onChange={(e)=>setReadmore(e.target.value)}
                />
            </div>
        </div>
    </div>
}

export default function BoxEditor({id, onSave, onCancel}){

    const box = useGridBox(id);
    const isLoading = useIsLoading();

    if(isLoading) return <p>Loading...</p>;

    // todo: check loading state
    if(typeof box !== typeof {}) return <p>Box {id} not found.</p>;

    return <Editor box={box} onSave={(changedBox)=>{
            // todo: save stuf
            onSave();
        }}
        onCancel={onCancel}
    />

};