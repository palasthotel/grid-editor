import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Store from './data/store';
import { initAjax } from './data/connection/ajax';
import Root from './components/Grid/Root';
import { effectOnAltKey } from './effect/effectAltKey';

export default function GridEditor({
    elementId,
    ajaxUrl
}){

    // initialize data
    initAjax({url:ajaxUrl});
    const store = Store();

    // render app
    const root = document.getElementById(elementId);
    render(<Provider store={store}><Root /></Provider>, root);

    // store effects
    effectOnAltKey(store);

    // expose
    return {
        root,
        store,
        ajaxUrl,
    };
}