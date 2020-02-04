import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { DragDropContext} from 'react-beautiful-dnd';
import {makeStyles} from '@material-ui/styles';
import Toolbars from './Toolbars';
import Grid from './content/Grid';
import BoxEditor from '../Editor/BoxEditor';
import BoxEditorRoute from '../Editor/BoxEditorRoute';

const useStyles = makeStyles({
    wrapper:{
        border: "1px solid #efefef",
        backgroundColor: "#f5f5f5",
        "& *":{
            fontFamily: "'Open Sans', sans-serif",
        }
    },
    gridContent:(dimensions)=>({
        margin: `0 ${dimensions.materialsPanelWidth}px 0 ${dimensions.actionsPanelWidth}px`,
        padding: "10px 10px 60px 5px",
    }),
});


export default function Root(){

    const dimensions = {
        actionsPanelWidth: 50,
        materialsPanelWidth: 260,
    };

    const classes = useStyles(dimensions);

    // TODO: http://maisano.github.io/react-router-transition/animated-route/code

    return <div className={classes.wrapper}>
        <Router basename={window.location.path}>
            <Switch>
                <Route path="/box/edit/:id">
                    <BoxEditorRoute />
                </Route>
                <Route path="/">
                    <DragDropContext onDragEnd={(props)=>{
                        console.log(props);
                    }}>
                        <Toolbars
                            {...dimensions}
                        />
                        <Grid className={classes.gridContent} />
                    </DragDropContext>
                </Route>
            </Switch>
        </Router>
    </div>
};