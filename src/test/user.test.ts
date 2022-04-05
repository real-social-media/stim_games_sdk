import { User, PermissionType } from "../user"
import * as channel from "../channel"

jest.mock("../channel.ts", () => ({
	showPrompt: jest.fn(),
}))

describe("askPermission", () => {
	it("askPermission get user id", () => {
		const data = { title: `Share the following information with App Name:\n`, desc: "• Username\n" }
		User.askPermission("App Name", [PermissionType.GET_USER_ID])

		const fooSpy = jest.spyOn(channel, "showPrompt")

		expect(fooSpy).toHaveBeenCalledWith(data)
	})
})
