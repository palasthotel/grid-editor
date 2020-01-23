import { useState, useEffect } from "react"

export const useWindowInnerHeight = ()=>{
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(window.innerHeight != height){
                setHeight(window.innerHeight);
            }
        }, 600);
        return ()=>{
            clearInterval(interval);
        };
    });
    return height;
}