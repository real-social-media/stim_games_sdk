import { askPermission, PermissionType } from "../user"
import * as channel from "../channel"

jest.mock("../channel.ts", () => ({
	showPrompt: jest.fn(),
}))

describe("askPermission", () => {
	it("askPermission get user id", () => {
		const data = { title: `Share your username with ` }
		askPermission(PermissionType.GET_USER_ID)

		const fooSpy = jest.spyOn(channel, "showPrompt")

		expect(fooSpy).toHaveBeenCalledWith(data)
	})
})
