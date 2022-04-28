/**
 * Functions Pertaining to Users Details and data sharing
 */
import { IframeActionKind, showPrompt } from "./channel"
import { string, object, array } from "yup"

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

const validationSchema = object().shape({
	appName: string()
		.min(3)
		.max(100)
		.required(),
	scopes: array().min(1),
})

export interface PermissionDataType {
	title: string
	desc: string
}
type PropType = { appName: string; scopes: PermissionType[] }

/** Ask Permissions to get and store the Users Personal Details  */
const askPermission = async (props: PropType): Promise<object | string> => {
	try {
		validationSchema.validateSync(props)

		const { appName, scopes } = props

		const title = `Share the following information with ${appName}:\n`
		let desc = ""
		scopes.forEach(s => (desc += `• ${getScopeString(s)}\n`))
		let data: PermissionDataType = { title, desc }

		showPrompt(data)

		return new Promise(res => {
			window.addEventListener(
				"message",
				function(e) {
					switch (e.data.type) {
						case IframeActionKind.GetUserDetails:
							res(e.data)
							break
					}
				},
				false,
			)
		})
	} catch (e) {
		return Promise.reject((e as any).message)
	}
}

/** Buy Passes  */
export function buyPass(passName: string) {}

export const User = {
	askPermission,
}
