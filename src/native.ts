/**
 * Default Channel handling Real Native App
 */

import { IframeAction, IframeActionKind } from "./channel"

// EVENTS
/** To Send Data from real app to the experience app */
export const postToExperienceEvent = (
	action: IframeAction<any>,
	targetId: string,
	isNative: boolean = false,
): void | IframeAction<any> => {
	// Can't execute post message in React Native because of API restrictions, that has to be injected in the App frontend
	if (isNative) {
		return action
	} else {
		const iframeWin = document.getElementById(targetId) as HTMLIFrameElement

		return iframeWin?.contentWindow?.postMessage(action, targetId)
	}
}

// FUNCTIONS
/** Initial Event called when the experience loads */
export function loadExperience(data: object, targetId: string, isNative?: boolean) {
	return postToExperienceEvent({ type: IframeActionKind.LoadExperience, payload: { data } }, targetId, isNative)
}

/** Sends user details to experience once approved by the user */
export function sendUserData(data: object | null, targetId: string, isNative?: boolean) {
	return postToExperienceEvent(
		{
			type: IframeActionKind.GetUserDetails,
			payload: { data },
		},
		targetId,
		isNative,
	)
}
