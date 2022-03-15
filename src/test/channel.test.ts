import { IframeActionKind, postToRealAppEvent, showPrompt } from "../channel"

describe("Real Web Channels", () => {
	let windowSpy: any

	beforeEach(() => {
		windowSpy = jest.spyOn(window, "parent", "get")
	})
	afterEach(() => {
		windowSpy.mockRestore()
	})

	describe("postToRealAppEvent", () => {
		it("postToRealAppEvent post message", () => {
			const action = {
				type: IframeActionKind.ShowPrompt,
				payload: { data: "data" },
			}

			const postMessageSpy = jest.fn()

			windowSpy.mockImplementation(() => ({
				postMessage: postMessageSpy,
			}))

			postToRealAppEvent(action)

			expect(postMessageSpy).toHaveBeenCalled()
		})
	})

	describe("showPrompt", () => {
		it("showPrompt returns action", () => {
			const data = { title: "test" }
			const action = {
				type: IframeActionKind.ShowPrompt,
				payload: { data },
			}

			const postMessageSpy = jest.fn()

			windowSpy.mockImplementation(() => ({
				postMessage: postMessageSpy,
			}))

			showPrompt(data)

			expect(postMessageSpy).toHaveBeenCalledWith(action, "*")
		})
	})
})
