/**
 * Functions Pertaining to Users Details and data sharing
 */
import { IframeActionKind, showPrompt } from "./channel"

export enum PermissionType {
	GET_USER_ID = "get_userid",
	GET_EMAIL = "get_email",
	GET_PASSES = "get_passes",
	BUY_PASSES = "buy_pass",
}

export interface PermissionDataType {
	title: string
}
/** Ask Permissions to get and store the Users Personal Details  */
const askPermission = async (appName: string, type: PermissionType) => {
	let data: PermissionDataType = { title: "" }

	switch (type) {
		case PermissionType.GET_USER_ID:
			data = { title: `Share your username with ${appName}` }
			break
		case PermissionType.GET_EMAIL:
			data = { title: `Share your email with ${appName}` }
			break
		case PermissionType.GET_PASSES:
			data = {
				title: `Grant ${appName} access to view your passes`,
			}
			break
	}

	showPrompt(data)

	return await new Promise((res, rej) => {
		window.addEventListener(
			"message",
			function(e) {
				switch (e.data.type) {
					case IframeActionKind.GetUserDetails:
						res({ type: "getData", payload: e.data })
						break
				}
			},
			false,
		)
	})
}

/** Buy Passes  */
export function buyPass(passName: string) {}

export const User = {
	askPermission,
}
