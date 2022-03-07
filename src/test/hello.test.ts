import { hello } from "../"

describe("hello world", () => {
	it("works", () => {
		expect(hello()).toEqual("hello")
	})
})
