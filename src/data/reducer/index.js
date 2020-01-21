import { combineReducers } from 'redux';

import reduceUI from './ui';
import reduceGrid from './grid.document';
import reducePermissions from './permissions';
import { reduceBoxTypes, reduceBoxMetaTypes } from './box.types';
import reduceContainerTypes from './container.types';
import reduceStyles from './styles';
import reduceRevisions from './revisions';

export default combineReducers({
	styles: reduceStyles,
	permissions: reducePermissions,

	grid: reduceGrid,
	revisions: reduceRevisions,

	container_types: reduceContainerTypes,
	box_meta_types: reduceBoxMetaTypes,
	box_types: reduceBoxTypes,

	ui: reduceUI,
});