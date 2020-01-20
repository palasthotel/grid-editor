import {
	PERMISSIONS,
} from '../actions/types';


export default function reducePermissions(state = [], action) {
	switch (action.type){
		case PERMISSIONS:
			return [
				...action.payload.permissions,
			]
	}
	return state;
}