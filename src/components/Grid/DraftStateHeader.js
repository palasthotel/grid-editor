import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    draftStateBar:props => ({
        backgroundColor: (!props.isDraft)? "green": "orange",
        height: 5,
    }),
})

export default function DraftStateHeader(){
    const isDraft = useSelector(state => state.grid.isDraft);
    const classes = useStyles({isDraft});
    return <div className={classes.draftStateBar}></div>
}