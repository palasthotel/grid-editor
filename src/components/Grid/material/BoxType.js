import React, { useState } from "react"
import { useSelector } from "react-redux";

export const BoxType = ({type})=>{
    return <p>{type}</p>
}

export const BoxMetaType = ({type, title})=>{
    const [isOpen, setOpen] = useState(false);
    const boxTypes = useSelector(({box_types}) => box_types[type] || [] );
    console.log(boxTypes);
    return <>
        <dt onClick={()=>setOpen(!isOpen)}>{title}</dt>
        <dd>{
            !isOpen ? null: <ul>{boxTypes.map(box=> <li key={box.type}><BoxType  {...box} /></li>)}</ul>
            }
        </dd>
    </>
}