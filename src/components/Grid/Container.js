import React from 'react';

export default function Container(props){
    console.log(props);
    return (
        <div>
            {props.children}
        </div>
    )
}