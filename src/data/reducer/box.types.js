import {
	BOX__META_TYPES,
	BOX__TYPES,
} from '../actions/types';

export default function reduceBoxTypes(state = [], action){
	switch (action.type) {
		case BOX__META_TYPES:
			return [
				...action.payload.types
			];
		case BOX__TYPES:
			const types = [];
			for(const i in state){
				const box_type = {...state[i]};
				if(box_type.type === action.payload.box_meta_type){
					box_type.boxes = action.payload.boxes;
				}
				types.push(box_type)
			}

			return types
		default:
			return state;
	}
}