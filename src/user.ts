/**
 * Functions Pertaining to Users Details and data sharing
 */

import { showPrompt } from "./channel"
import { Global, GlobalType } from "./global"

export enum PermissionType {
	GET_USER_ID = "get_userid",
	GET_EMAIL = "get_email",
	GET_PASSES = "get_passes",
	BUY_PASSES = "buy_pass",
}

/** Call this function initially to initialize the SDK */
export function initializeSdk(details: GlobalType) {
	Global.user = details.user
}

export interface PermissionDataType {
	title: string
}
/** Ask Permissions to get and store the Users Personal Details  */
export function askPermission(type: PermissionType) {
	let data: PermissionDataType = { title: "" }

	switch (type) {
		case PermissionType.GET_USER_ID:
			data = { title: `Share your username with ${Global.user.userName}` }
			break
		case PermissionType.GET_EMAIL:
			data = { title: `Share your email with ${Global.user.userName}` }
			break
		case PermissionType.GET_PASSES:
			data = {
				title: `Grant ${Global.user.userName} access to view your passes`,
			}
			break
	}

	showPrompt(data)
}

/** Buy Passes  */
export function buyPass(passName: string) {}
