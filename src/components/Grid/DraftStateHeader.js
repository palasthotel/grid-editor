import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import { colorDraft, colorPublished } from '../constants/colors';

const useStyles = makeStyles({
    draftStateBar:props => ({
        backgroundColor: (!props.isDraft)? colorPublished: colorDraft,
        height: 5,
    }),
})

export default function DraftStateHeader(){
    const isDraft = useSelector(state => state.grid.isDraft);
    const classes = useStyles({isDraft});
    return <div className={classes.draftStateBar}></div>
}