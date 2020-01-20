import {
	ALL_STYLES,
} from '../actions/types';

export default function reduceStyles(state = [], action) {
	switch (action.type){
		case ALL_STYLES:
			return [
				...action.payload.styles,
			]
	}
	return [
		...state,
	];
}