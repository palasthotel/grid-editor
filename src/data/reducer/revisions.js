
import {
	GRID__REVISIONS,
} from '../actions/types';

export default function reduceRevisions(state = [], action) {
	switch (action.type){
		case GRID__REVISIONS:
			return [
				...action.payload.revisions,
			]
	}
	return state;
}