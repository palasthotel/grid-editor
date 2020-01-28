import React, {memo} from 'react';
import { makeStyles } from '@material-ui/styles';
import { colorBoxControlsBg } from '../../../style/colors';
import BoxControls from './BoxControls';
import BoxContent from './BoxContent';

const useStyles = makeStyles({
    box:{
        position: "relative",
        padding: 10,
        minHeight: 80,
        backgroundColor: "white",
        "& + &":{
            marginTop: 4,
        },
    },
    controls:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color:"white",
        overflow:"hidden",
        backgroundColor: colorBoxControlsBg,
        transition: "all 137ms ease",
        opacity: 0,
        "$box:hover &":{
            opacity: 1,
        }
    },
    content:{
        fontSize: "0.8rem",
    },
})

const Box =(props) => {
    const classes = useStyles();
    return <div className={classes.box}>
        <BoxControls className={classes.controls} />
        <BoxContent className={classes.content} {...props} />
    </div>;
}

export default memo(Box);
