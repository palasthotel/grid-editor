import React from 'react';

export default function Slot(props){
    console.log(props);
    return (
        <div>
            <p>Slot</p>
            <div>{props.children}</div>
        </div>
    );
}