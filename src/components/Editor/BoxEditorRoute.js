import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BoxEditor from './BoxEditor';

export default function BoxEditorRoute(){
    // handles route for box editor in grid editor
    const params = useParams();
    const history = useHistory();
    return <BoxEditor
        id={params.id}
        onSave={()=>history.goBack() }
        onCancel={()=> history.goBack()}
    />
}