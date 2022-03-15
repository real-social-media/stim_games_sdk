import { IframeActionKind } from "../channel"
import { fetchUserData, loadExperience, postToExperienceEvent } from "../native"

describe("Real Web Channels", () => {
	let frameSpy: any
	let frame: any
	const targetId = "http://localhost:3000"

	beforeEach(() => {
		frame = window.document.createElement("iframe")
		window.document.body.appendChild(frame)
		frame.id = targetId

		frameSpy = jest.spyOn(frame, "contentWindow", "get")
	})

	afterEach(() => {
		frameSpy.mockRestore()
		frame.remove()
	})

	describe("postToExperienceEvent", () => {
		it("postToExperienceEvent post message on web", () => {
			const action = {
				type: IframeActionKind.LoadExperience,
				payload: { data: "data" },
			}

			const postMessageSpy = jest.fn()
			frameSpy.mockImplementation(
				() =>
					({
						postMessage: postMessageSpy,
						close: jest.fn(),
					} as any),
			)

			postToExperienceEvent(action, targetId, false)

			expect(frame?.contentWindow?.postMessage).toHaveBeenCalledWith(
				action,
				targetId,
			)
		})

		it("postToExperienceEvent return action on native", () => {
			const action = {
				type: IframeActionKind.LoadExperience,
				payload: { data: "data" },
			}

			const data = postToExperienceEvent(action, targetId, true)

			expect(data).toEqual(action)
		})
	})

	describe("loadExperience", () => {
		it("loadExperience runs postMessage on web", () => {
			const data = { title: "test" }
			const action = {
				type: IframeActionKind.LoadExperience,
				payload: { data },
			}

			const postMessageSpy = jest.fn()
			frameSpy.mockImplementation(
				() =>
					({
						postMessage: postMessageSpy,
						close: jest.fn(),
					} as any),
			)

			loadExperience(data, targetId, false)

			expect(frame?.contentWindow?.postMessage).toHaveBeenCalledWith(
				action,
				targetId,
			)
		})

		it("fetchUserData returns action on native", () => {
			const data = { title: "test" }
			const action = {
				type: IframeActionKind.LoadExperience,
				payload: { data },
			}

			const postMessageSpy = jest.fn()
			frameSpy.mockImplementation(
				() =>
					({
						postMessage: postMessageSpy,
						close: jest.fn(),
					} as any),
			)

			const value = loadExperience(data, targetId, true)

			expect(value).toEqual(action)
		})
	})

	describe("fetchUserData", () => {
		it("fetchUserData runs postMessage on web", () => {
			const data = { title: "test" }
			const action = {
				type: IframeActionKind.GetUserDetails,
				payload: { data },
			}

			const postMessageSpy = jest.fn()
			frameSpy.mockImplementation(
				() =>
					({
						postMessage: postMessageSpy,
						close: jest.fn(),
					} as any),
			)

			fetchUserData(data, targetId, false)

			expect(frame?.contentWindow?.postMessage).toHaveBeenCalledWith(
				action,
				targetId,
			)
		})

		it("fetchUserData returns action on native", () => {
			const data = { title: "test" }
			const action = {
				type: IframeActionKind.GetUserDetails,
				payload: { data },
			}

			const postMessageSpy = jest.fn()
			frameSpy.mockImplementation(
				() =>
					({
						postMessage: postMessageSpy,
						close: jest.fn(),
					} as any),
			)

			const value = fetchUserData(data, targetId, true)

			expect(value).toEqual(action)
		})
	})
})
