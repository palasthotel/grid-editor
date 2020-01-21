import {
	BOX__META_TYPES,
	BOX__TYPES,
} from '../actions/types';


export const reduceBoxMetaTypes = (state = [], action) =>{
	switch (action.type) {
		case BOX__META_TYPES:
			return [
				...action.payload.types
			];
		default:
			return state;
	}
}


export const reduceBoxTypes = (state = [], action) =>{
	switch (action.type) {
		case BOX__TYPES:
			console.log("reduce BOX TYPES", action);
			return {
				...state,
				[action.payload.meta_type]: action.payload.boxes,
			}
		default:
			return state;
	}
}