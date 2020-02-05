import React from 'react';

export default function TextareaWidget({label, value, onChange}){
    return <TextField
        label={label}
        multiline
        rows="4"
        value={value}
        variant="outlined"
        onChange={(e)=>onChange(e.target.value)}
    />
}