import { actionSetIsAltKeyPressed } from '../data/actions/ui';

export const effectOnAltKey = (store)=>{

    const onAltKeyPressed = (event)=>{

        if(event.keyCode != 18) return;

        if(event.altKey && !store.getState().ui.isAltKeyPressed){
            store.dispatch(actionSetIsAltKeyPressed(true));
        } else if(store.getState().ui.isAltKeyPressed){
            store.dispatch(actionSetIsAltKeyPressed(false));
        }
    };

    document.body.onkeydown = onAltKeyPressed;
    document.body.onkeyup = onAltKeyPressed;
};