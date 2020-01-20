// https://github.com/mzabriskie/axios
import axios from 'axios';

// ------------------------------------------------------------
// init
// ------------------------------------------------------------

/*
 * settings for ajax connection
 */
const _settings = {};
export const initAjax = (settings) => {
	_settings.url = settings.url;
}

/*
 * private ajax execution method
 */
const requestBackend = (component, method, params = [])=>{
	if(typeof _settings.url === typeof undefined) throw("Please init backend with ajax url")
	return axios.post(
		_settings.url,
		{
			method: method,
			component: component,
			params: params,
		}
	).then((response)=>response.data.result);
}


// ------------------------------------------------------------
//  general requests
// ------------------------------------------------------------
export const fetchGrid =
	(grid_id) => requestBackend(
		"grid.document",
		"loadGrid",
		[grid_id]
	)
export const fetchDraftState =
	(grid_id) => requestBackend(
		"grid.document",
		"checkDraftStatus",
		[grid_id]
	)
export const fetchRevisions =
	(grid_id) => requestBackend(
		"grid.document",
		"getGridRevisions",
		[grid_id]
	)
export const fetchPermissions =
	() => requestBackend(
		"grid.permissions",
		"Rights"
	)
export const fetchAllStyles =
	() => requestBackend(
		"grid.styles",
		"getAllStyles"
	)
export const fetchContainerStyles =
	() => requestBackend(
		"grid.styles",
		"getContainerStyles"
	)
export const fetchSlotStyles =
	() => requestBackend(
		"grid.styles",
		"getSlotStyles"
	)
export const fetchBoxStyles =
	() => requestBackend(
		"grid.styles",
		"getBoxStyles"
	)

// --------------------------------------------------
// grid document manipulation
// --------------------------------------------------
export const executePublishDraft =
	(grid_id) => requestBackend(
		"grid.document",
		"publishDraft",
		[grid_id]
	)
export const executeRevertDraft =
	(grid_id) => requestBackend(
		"grid.document",
		"revertDraft",
		[grid_id]
	)
export const executeRevertToRevision =
	({grid_id, revision}) => requestBackend(
		"grid.document",
		"setToRevision",
		[grid_id, revision]
	)


// --------------------------------------------------
// container requests
// --------------------------------------------------
export const fetchContainerTypes =
	(grid_id) => requestBackend(
		"grid.editing.container",
		"getContainerTypes",
		[grid_id]
	)
export const executeContainerAdd =
	({grid_id, container_type, to_index}) => requestBackend(
		"grid.editing.container",
		"addContainer",
		[ grid_id, container_type, to_index ]
	)
export const executeContainerUpdate =
	( {grid_id, container_id, container} ) => requestBackend(
		"grid.editing.container",
		"updateContainer",
		[ grid_id, container_id, container ]
	)
export const executeContainerMove =
	({grid_id, container_id, to_index} ) => requestBackend(
		"grid.editing.container",
		"moveContainer",
		[ grid_id, container_id, to_index ]
	)
export const executeContainerDelete =
	({ grid_id, container_id } ) => requestBackend(
		"grid.editing.container",
		"deleteContainer",
		[ grid_id, container_id ]
	)
export const executeContainerReuse =
	({grid_id, container_id, title} ) => requestBackend(
		"grid.editing.container",
		"reuseContainer",
		[ grid_id, container_id, title ]
	)

// --------------------------------------------------
// box requests
// --------------------------------------------------
export const fetchBoxMetaTypes =
	(grid_id) => requestBackend(
		"grid.editing.box",
		"getMetaTypesAndSearchCriteria",
		[grid_id]
	)
export const fetchBoxTypes =
	({grid_id, box_meta_type, query, criteria}) => requestBackend(
		"grid.editing.box",
		"Search",
		[grid_id, box_meta_type, query,	criteria]
	)
export const executeBoxCreate =
	({grid_id, to_container_id, to_slot_id,to_box_index, box_type, box_content}) => requestBackend(
		"grid.editing.box",
		"CreateBox",
		[ grid_id, to_container_id, to_slot_id,to_box_index, box_type, box_content ]
	)
export const executeBoxMove =
	({grid_id, from_container_id, from_slot_id,	from_box_index, to_container_id, to_slot_id, to_box_index}) => requestBackend(
		"grid.editing.box",
		"moveBox",
		[ grid_id, from_container_id, from_slot_id,	from_box_index, to_container_id, to_slot_id, to_box_index ]
	)
export const executeBoxRemove =
	({grid_id, container_id, slot_id, index}) => requestBackend(
		"grid.editing.box",
		"removeBox",
		[ grid_id, container_id, slot_id, index ]
	)
export const fetchBox =
	({grid_id, container_id, slot_id, index}) => requestBackend(
		"grid.editing.box",
		"fetchBox",
		[ grid_id, container_id, slot_id, index ]
	)
export const executeBoxUpdate =
	({grid_id, container_id, slot_id, index, box}) => requestBackend(
		"grid.editing.box",
		"UpdateBox",
		[ grid_id, container_id, slot_id, index, box ]
	)

// --------------------------------------------------
// grid widget requests
// --------------------------------------------------
export const fetchWidgetsTypeAheadSearch =
	({grid_id, container_id, slot_id, box_index, field, query}) => requestBackend(
		"grid.widgets.typeahead",
		"typeAheadSearch",
		[ grid_id, container_id, slot_id, box_index, field, query ]
	)
export const fetchWidgetsTypeAheadGetText =
	({grid_id, container_id, slot_id, box_index, path, id}) => requestBackend(
		"grid.widgets.typeahead",
		"typeAheadGetText",
		[ grid_id, container_id, slot_id, box_index, path, id ]
	)