
import {
	BOX__ADD,
	BOX__MOVE,
	BOX__REMOVE,
	BOX__UPDATE,
} from './types'

import {
	actionSetGridLoading, actionSetBackgroundIsLoading,
} from './ui'

import {
	executeBoxCreate,
	executeBoxMove,
	executeBoxRemove,
	executeBoxUpdate,
} from '../connection/ajax'

export const actionAddBox = (args) => ({
	type: BOX__ADD,
	payload: {...args},
});
export const actionRemoveBox = (args)=>({
	type: BOX__REMOVE,
	payload: {...args},
});
export const actionMoveBox = (args)=>({
	type: BOX__MOVE,
	payload: {...args},
});
export const actionUpdateBox = (args)=>({
	type: BOX__UPDATE,
	payload: {...args},
});

/**
 *
 * @param {{ grid_id, to_container_id, to_slot_id, to_box_index, box_type, box_content }} args
 * @return {function}
 */
export const actionBoxCreate = (args) => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeBoxCreate(args).then(result=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionBoxAdd({ ...args, box: result }));
	});
}
/**
 *
 * @param {{grid_id, from_container_id, from_slot_id, from_box_index, to_container_id, to_slot_id, to_box_index} } args
 * @return {function}
 */
export const actionBoxMove = args => dispatch => {
	dispatch(actionSetGridLoading(true))
	executeBoxMove(args).then(success=>{
		dispatch(actionSetGridLoading(false));
		// TODO: do someting on !success
		dispatch(actionMoveBox({ ...args, success }));
	});
}

/**
 *
 * @param {{grid_id, container_id, slot_id, index}} args
 * @return {function}
 */
export const actionBoxRemove = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeBoxRemove(args).then(success=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionRemoveBox({ ...args, success }));
	});
}

/**
 *
 * @param {{grid_id, container_id, slot_id, index, box}} args
 * @return {function}
 */
export const actionBoxUpdate = args => dispatch => {
	dispatch(actionSetGridLoading(true));
	executeBoxUpdate(args).then(box=>{
		dispatch(actionSetGridLoading(false));
		dispatch(actionUpdateBox({ ...args, box  }));
	});
}