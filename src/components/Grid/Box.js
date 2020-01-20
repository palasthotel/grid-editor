import React from 'react';

export default function Box({id, html, title, titleurl, prolog, eplilog, readmore, readmoreurl}){
    return (
        <div>
            <div>
	            <h3>{title}</h3>
	                <div>{prolog}</div>
	                <div>CONTENT</div>
	                <div>{eplilog}</div>
	                <p>{readmore}</p>
            </div>
            <div>
                <i>DRAG</i>
                <div>EDIT</div>
            <div>DELETE</div>
            <div>Duplicate</div>
        </div>
    </div>
    );
}