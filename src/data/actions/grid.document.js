
import {
	GRID__STATE,
	GRID__IS_DRAFT,
	GRID__REVISIONS,
} from './types'

import {
	actionSetGridIsLoading,
	actionSetBackgroundIsLoading
} from './ui'

import {
	fetchGrid,
	executePublishDraft,
	fetchDraftState,
	fetchRevisions,
	executeRevertDraft,
	executeRevertToRevision,
} from '../connection/ajax'


export const actionSetGrid = grid => ({type: GRID__STATE, payload: {grid}});
export const actionSetIsDraft = isDraft => ({
	type: GRID__IS_DRAFT,
	payload: {isDraft}
});
export const actionSetRevisions = revisions => ({
	type: GRID__REVISIONS,
	payload: { revisions },
} );


export const actionGetGrid = grid_id => dispatch => {
	dispatch(actionSetGridIsLoading(true));
	fetchGrid(grid_id).then(grid=>{
		dispatch(actionSetGridIsLoading(false));
		dispatch(actionSetGrid(grid));
	});
};

export const actionIsDraft = grid_id => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	fetchDraftState(grid_id).then(isDraft=>{
		dispatch(actionSetBackgroundIsLoading(false));
		dispatch(actionSetIsDraft(isDraft));
	});
}

export const actionPublish = grid_id => dispatch => {
	dispatch(actionSetBackgroundIsLoading(true));
	executePublishDraft(grid_id).then(success=>{
		// TODO: do something if is not successful
		dispatch(actionSetBackgroundIsLoading(true));
		dispatch(actionSetIsDraft(false));
	});
}


export const actionRevertDraft = grid_id => dispatch => {
	dispatch(actionSetGridIsLoading(true));
	executeRevertDraft(grid_id).then(grid=>{
		dispatch(actionSetGrid(grid));
		dispatch(actionSetGridIsLoading(false));
	});
}

export const actionRevertToRevision = args => dispatch => {
	dispatch(actionSetGridIsLoading(true));
	executeRevertToRevision(args).then(grid=>{
		dispatch(actionSetGrid(grid));
		dispatch(actionSetGridIsLoading(false));
	});
}

export const actionGetRevisions = grid_id => dispatch => {
	dispatch(actionSetGridIsLoading(true));
	fetchRevisions(grid_id).then(revisions=>{
		dispatch(actionSetGridIsLoading(false));
		dispatch(actionSetRevisions(revisions));
	});
}


