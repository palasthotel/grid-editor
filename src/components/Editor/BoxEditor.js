import React, { useState, useRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useGridBox } from '../../hook/useGrid';
import { TextField } from '@material-ui/core';
import { useIsLoading } from '../../hook/useUi';
import ActionsPanel, { ActionButtonSave, ActionButtonCancel } from '../Grid/ActionPanel';
import { makeStyles } from '@material-ui/styles';
import { colorLightSurface } from '../../style/colors';
import Collapsible from '../Collapsible';

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
        prolog, epilog
    } = box;
    const [_title, setTitle] = useState(title);
    const [_readmore, setReadmore] = useState(readmore);
    const handleOnSave = ()=>{
        onSave({
            ...box,
            title:_title,
            readmore: _readmore,
        });
    };

    const config = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
    };
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
                    <CKEditor
                        editor={ ClassicEditor }
                        data={prolog}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                        config={config}
                    />
                </Collapsible>
                <Collapsible label={"Box specific settings"}>
                    <p>Generated content fields</p>
                </Collapsible>
                <Collapsible label={"Epilog"}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={epilog}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                        config={config}
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