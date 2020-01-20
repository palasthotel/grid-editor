
import {
	UI__STATE_SET,
} from './types';

/**
 * genereal ui state change
 * @param key
 * @param value
 * @return {{type: string, payload: {key: string, value: * }}}
 */
export function actionUiStateChange(key, value){
	return {type: UI__STATE_SET, payload:{ key, value }};
}

export const actionSetBackgroundIsLoading =
	(isLoading) => actionUiStateChange("backgroundIsLoading", isLoading)

export const actionSetGridIsLoading =
	(isLoading) => actionUiStateChange("gridIsLoading", isLoading);
