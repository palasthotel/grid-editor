
import {
	CONTAINER__TYPES,
	CONTAINER__ADD,
	CONTAINER__DELETE,
	CONTAINER__MOVE,
	CONTAINER__UPDATE,
} from './types'

import {
	actionSetGridLoading,
} from './ui'

import { fetchContainerTypes, executeContainerAdd, executeContainerMove, executeContainerDelete, executeContainerUpdate } from '../connection/ajax'

export const actionSetContainerTypes = (types) => ({
	type: CONTAINER__TYPES,
	payload: {types},
});
export const actionAddContainer = (args) => ({
	type: CONTAINER__ADD,
	payload: args,
});
export const actionMoveContainer = (args) => ({
	type: CONTAINER__MOVE,
	payload: args,
});
export const actionDeleteContainer = (args) => ({
	type: CONTAINER__DELETE,
	payload: args,
});
export const actionUpdateContainer = (args) => ({
	type: CONTAINER__UPDATE,
	payload: args,
});

/**
 *
 * @param {int} grid_id
 * @return {function}
 */
export const actionGetContainerTypes = grid_id => dispatch => {
	dispatch(actionSetGridLoading(true));
	fetchContainerTypes(grid_id).then(result=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionSetContainerTypes(result));
	});
}

/**
 *
 * @param {{grid_id, container_type, to_index}} args
 * @return {function}
 */
export const actionContainerAdd = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeContainerAdd(args).then(result=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionAddContainer({
			...args,
			container: {
				...result,
				type: args.container_type,
			}
		}));
	});
}

/**
 *
 * @param {{grid_id, container_id, to_index}} args
 * @return {function}
 */
export const actionContainerMove = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeContainerMove(args).then(result=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionMoveContainer({ ...args, result }));
	});
}

/**
 *
 * @param {{grid_id, container_id}} args
 * @return {function}
 */
export const actionContainerDelete = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeContainerDelete(args).then(result=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionDeleteContainer({ ...args, result }));
	});
}

/**
 *
 * @param {{grid_id, container_id, container}} args
 * @return {function}
 */
export const actionContainerUpdate = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeContainerUpdate(args).then(success=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionUpdateContainer({ ...args, success  }));
	});
}