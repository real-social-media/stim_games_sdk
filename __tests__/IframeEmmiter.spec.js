import IframeEmmiter from "IframeEmmiter"

const target = {
	addEventListener: jest.fn(),
	postMessage: jest.fn(),
}

const testAction = payload => ({ type: "TEST", payload })

describe("IframeEmmiter", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it("request", async () => {
		const emitter = new IframeEmmiter(target)
		emitter.request(testAction())

		expect(target.postMessage).toHaveBeenCalledWith(JSON.stringify(testAction()), "*")
	})

	it("success", async () => {
		jest.spyOn(window, "addEventListener")
		const emitter = new IframeEmmiter(target)
		const request = emitter.request(testAction())

		expect(window.addEventListener).toHaveBeenCalledWith("message", expect.any(Function))

		const response = window.addEventListener.mock.calls[0][1]
		const event = { data: JSON.stringify(testAction({ token: "token" })) }
		response(event)

		await expect(request).resolves.toEqual(JSON.parse(event.data))
	})

	it("failure", async () => {
		jest.spyOn(window, "addEventListener")
		const emitter = new IframeEmmiter(target)
		const request = emitter.request(testAction())

		expect(window.addEventListener).toHaveBeenCalledWith("message", expect.any(Function))

		const response = window.addEventListener.mock.calls[0][1]
		const error = "Error"
		const event = { data: JSON.stringify({ type: "TEST", error }) }
		response(event)

		await expect(request).rejects.toEqual(error)
	})
})
