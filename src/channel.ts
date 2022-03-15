/**
 * Default Channel handling Real Web App
 */

import { PermissionDataType } from "./user"

export enum IframeActionKind {
	RequestPermission = "requestPermission",
	ShowPrompt = "showPrompt",
	GetUserDetails = "getUserDetails",
	LoadExperience = "loadExperience",
}

export type IframeAction<T> = {
	type: IframeActionKind
	payload?: { data: T }
}

// EVENTS
/** To Send Data from experience to real app */
export const postToRealAppEvent = (action: IframeAction<any>): void => {
	// Send Post message to any available window method. As web and native have their respective listeners

	window?.parent?.postMessage(action, "*")
	;(window as any)?.ReactNativeWebView?.postMessage(JSON.stringify(action), "*")
}

// ACTIONS
export const showPromptAction = (
	data: PermissionDataType,
): IframeAction<PermissionDataType> => ({
	type: IframeActionKind.ShowPrompt,
	payload: { data },
})

// FUNCTIONS
/** Shows users a Prompt with OK and Cancel button */
export function showPrompt(data: PermissionDataType) {
	postToRealAppEvent(showPromptAction(data))
}
