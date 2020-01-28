
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

export default function createGridStore(state = {
	// base
	styles: [],
	permissions: [],

	// document
	grid: {},
	revisions: [],

	// tools
	container_types: [],
	box_meta_types: [],
	box_types: {},

	// ui states
	ui: {
		isAltKeyPressed: false,
	},

}){

	let middleware = [];

	if (process.env.NODE_ENV !== 'production') {
		const logger = store => next => action => {
			if(typeof action !== "function") console.log('dispatching', action);
			const result = next(action);
			return result;
		};
		middleware.push(logger);
	}

	middleware.push(thunk);

	const enhancers = (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function")?
		compose(
			applyMiddleware(...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__()
		)
		:
		applyMiddleware(...middleware);


	return createStore(
		reducer,
		state,
		enhancers
	);
}