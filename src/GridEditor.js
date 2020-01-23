import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Store from './data/store'
import { initAjax } from './data/connection/ajax';
import Root from './components/Grid/Root';

export default function GridEditor({
    elementId,
    ajaxUrl
}){
    initAjax({url:ajaxUrl});
    const store = Store();
    const root = document.getElementById(elementId);
    render(<Provider store={store}><Root /></Provider>, root);
    return {
        root,
        store,
        ajaxUrl,
    };
}