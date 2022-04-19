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

const getScopeString = (type: PermissionType) => {
	const permissionStrings = {
		[PermissionType.GET_USER_ID]: "Username",
		[PermissionType.GET_EMAIL]: "Email",
		[PermissionType.GET_PASSES]: "Access to view your passes",
		[PermissionType.BUY_PASSES]: "Access to buy passes",
	}

	return permissionStrings[type]
}

export interface PermissionDataType {
	title: string
	desc: string
}
/** Ask Permissions to get and store the Users Personal Details  */
const askPermission = async (appName: string, scopes: PermissionType[]) => {
	const title = `Share the following information with ${appName}:\n`
	let desc = ""
	scopes.forEach(s => (desc += `• ${getScopeString(s)}\n`))
	let data: PermissionDataType = { title, desc }

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
