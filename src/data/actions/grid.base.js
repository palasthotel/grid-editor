
import {
	ALL_STYLES,
	CONTAINER_STYLES,
	SLOT_STYLES,
	BOX_STYLES,
    PERMISSIONS,
	BOX__META_TYPES,
    BOX__TYPES,
} from './types'

import {
    fetchBoxMetaTypes,
	fetchBoxTypes,
	fetchAllStyles,
	fetchPermissions,
	fetchContainerStyles,
	fetchSlotStyles,
} from '../connection/ajax'

export const actionSetAllStyles = styles => ({
	type: ALL_STYLES,
	payload: { styles },
});
export const actionSetContainerStyles = styles => ({
	type: CONTAINER_STYLES,
	payload: { styles },
});
export const actionSetSlotStyles = styles => ({
	type: SLOT_STYLES,
	payload: { styles },
});
export const actionSetBoxStyles = styles => ({
	type: BOX_STYLES,
	payload: { styles },
});
export const actionSetPermissions = permissions => ({
	type: PERMISSIONS,
	payload: {permissions},
});
export const actionSetBoxMetaTypes = (types) => ({
	type: BOX__META_TYPES,
	payload: { types },
});
export const actionSetBoxTypes = (meta_type, boxes) => ({
	type: BOX__TYPES,
	payload: { meta_type, boxes },
});

export const actionGetStyles = () => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchAllStyles().then(styles=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetAllStyles(styles));
	});
}
export const actionGetContainerStyles = () => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchContainerStyles().then(styles=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetContainerStyles(styles));
	});
}
export const actionGetSlotStyles = () => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchSlotStyles().then(styles=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetSlotStyles(styles));
	});
}
export const actionGetBoxStyles = () => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchSlotStyles().then(styles=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetBoxStyles(styles));
	});
}

export const actionGridPermissionRights = () => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchPermissions().then(permissions=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetPermissions(permissions));
	});
}

/**
 *
 * @param grid_id
 * @return {function}
 */
export const actionGetMetaTypes = grid_id => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchBoxMetaTypes(grid_id).then(result=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetBoxMetaTypes(result));
	});
}

/**
 *
 * @param {{grid_id, box_meta_type, query, criteria}} args
 * @return {function}
 */
export const actionGetBoxTypes = args => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchBoxTypes(args).then(types=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetBoxTypes(args.box_meta_type, types));
	});
}