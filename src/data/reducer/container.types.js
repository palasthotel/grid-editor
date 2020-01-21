import {
    CONTAINER__TYPES,
} from '../actions/types';

export default function reduceContainerTypes(state = [], action){
	switch(action.type){
		case CONTAINER__TYPES:
			return [
				...state,
				...action.payload.types,
			];
	}
	return state;
}