import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export default function CheckboxWidget({label, value, onChange}){
    return <FormControlLabel
    control={
        <Checkbox
            checked={value}
            onChange={(e)=>onChange(e.target.checked)}
        />
    }
    label={label}
    />
}