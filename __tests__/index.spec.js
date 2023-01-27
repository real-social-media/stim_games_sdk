import GamesSDK from "GamesSDK"
import sdk, { IframeActionKind, actions } from "index"

describe("Index File", () => {
	it("export default instance of the sdk", () => {
		expect(sdk).toBeInstanceOf(GamesSDK)
	})

	it("export actions types", () => {
		expect(IframeActionKind).toEqual({
			Authorize: "@gameSDK:authorize",
			CheckPurchases: "@gameSDK:checkPurchases",
			Purchase: "@gameSDK:purchase",
			RequestEmail: "@gameSDK:requestEmail",
		})
	})

	it("export actions", () => {
		expect(actions).toEqual({
			authorize: expect.any(Function),
			checkPurchases: expect.any(Function),
			purchase: expect.any(Function),
			requestEmail: expect.any(Function),
		})
	})
})
