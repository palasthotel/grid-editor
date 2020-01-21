import GridEditor from '../src/GridEditor';
import { actionSetGridIsLoading } from '../src/data/actions/ui';
import { actionSetBoxMetaTypes, actionSetPermissions, actionSetBoxTypes } from '../src/data/actions/grid.base';
import { actionSetContainerTypes } from '../src/data/actions/grid.container';
import { actionSetGrid, actionSetRevisions } from '../src/data/actions/grid.document';

import containerTypes from './dummy-data/container_types';
import gridData from './dummy-data/grid';
import revisions from './dummy-data/revisions';
import boxMetaTypes from './dummy-data/box-meta-types';
import boxTypes from './dummy-data/box-type-static';
import permissions from './dummy-data/permissions';


const grid = GridEditor({
    elementId: "grid-app",
    editorWidgets: [],
});

grid.store.dispatch(actionSetGridIsLoading(true));
grid.store.dispatch(actionSetPermissions(permissions));

grid.store.dispatch(actionSetGrid(gridData));
grid.store.dispatch(actionSetRevisions(revisions));

grid.store.dispatch(actionSetContainerTypes(containerTypes));
grid.store.dispatch(actionSetBoxMetaTypes(boxMetaTypes));
grid.store.dispatch(actionSetBoxTypes("static",boxTypes));

