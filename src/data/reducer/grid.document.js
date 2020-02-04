
import {
	findSlot,
} from '../../utils/store-iterator';

import {
	GRID__STATE,
	GRID__IS_DRAFT,
	CONTAINER__ADD,
	CONTAINER__DELETE,
	CONTAINER__MOVE,
	CONTAINER__UPDATE,
	BOX__ADD,
	BOX__REMOVE,
	BOX__MOVE
} from '../actions/types';


export default function reduceGrid(state = {}, action){
	switch (action.type) {
		case GRID__STATE:
			return {
				...action.payload.grid,
			}
		case GRID__IS_DRAFT:
			return {
				...state,
				isDraft: action.payload.isDraft,
			};
	}
	return {
		...state,
		container: reduceContainer(state.container, action),
	};
}

function reduceContainer(state = [], action) {
	switch( action.type){
		case CONTAINER__ADD:
			return addContainer(state, action)
		case CONTAINER__DELETE:
			return deleteContainer(state, action)
		case CONTAINER__MOVE:
			return moveContainer(state, action)
		case CONTAINER__UPDATE:
			return updateContainer(state, action);
		default:
			return reduceBox(state, action);
	}
}

function addContainer(state, action){
	return [
		...state.slice(0, action.payload.to_index ),
		action.payload.container,
		...state.slice(action.payload.to_index)
	]
}

function deleteContainer(state, action){
	return [
		...state.filter((c)=> c.id !== action.payload.container_id)
	]
}

function moveContainer(state, action){
	const { to_index, container_id} = action.payload;
	const target_container = state.filter((c)=> c.id === container_id )[0];
	const new_list = state.filter( (c)=> c.id !== container_id );
	new_list.splice(to_index, 0, target_container)
	return new_list;
}

/**
 * update single container element
 * @param state
 * @param action
 * @return {Array}
 */
function updateContainer(state, action) {
	return state.container.map(c=>{
		return (c.id === action.payload.container_id)?
			{...action.payload.container} : c
	})
}

function reduceBox(state, action){
	switch (action.type){
		case BOX__ADD:
			return addBox(state, action)
		case BOX__REMOVE:
			return removeBox(state, action);
		case BOX__MOVE:
			return moveBox(state, action)
		default:
			return state;
	}
}

function addBox(state, action){
	const {to_container_id, to_slot_id, to_box_index, box} = action.payload;
	const container = [
		...state,
	]
	findSlot(container, to_container_id, to_slot_id).boxes.splice(to_box_index,0,box)
	return container;
}

function removeBox(state, action){
	const {container_id, slot_id, index } = action.payload;
	const container = [
		...state,
	]
	findSlot(container, container_id, slot_id).boxes.splice(index,1)
	return container;
}

function moveBox(state, action){
	const {
		from_container_id, from_slot_id, from_box_index,
		to_container_id, to_slot_id, to_box_index,
	} = action.payload

	const container = [...state]

	let same_slot_correction = 0;
	if(from_container_id === to_container_id
		&& from_slot_id === to_slot_id ){

		/**
		 * no need for operation. it's the same position
		 */
		if( from_box_index === to_box_index || from_box_index+1 === to_box_index) return container;

		/**
		 * if dragged box before destination and in same slot we need to decrease the index because of coming slice operation
		 */
		if(from_box_index < to_box_index){
			same_slot_correction = -1;
		}
	}

	const box = findSlot(container, from_container_id, from_slot_id).boxes.splice(from_box_index,1)[0]
	const slot = findSlot(container, to_container_id, to_slot_id);

	slot.boxes = [
		...slot.boxes.slice(0,to_box_index+same_slot_correction),
		box,
		...slot.boxes.slice(to_box_index+same_slot_correction),
	]

	return container;
}




