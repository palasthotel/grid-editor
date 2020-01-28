import React from 'react';

export default function BoxContent({
    className,
    title,
    prolog,
    html,
    eplilog,
    readmore
}){
    return <div className={className}>
        <h3>{title}</h3>
        <div>{prolog}</div>
        <div dangerouslySetInnerHTML={{__html:html}}></div>
        <div>{eplilog}</div>
        <p>{readmore}</p>
    </div>
};