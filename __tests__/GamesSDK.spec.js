import GamesSDK from "GamesSDK"

const emmiter = { send: jest.fn(), request: jest.fn() }
const gamesSDK = new GamesSDK(emmiter)

describe("GamesSDK", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe("authorize", () => {
		it("success", async () => {
			const userID = "userID123"
			emmiter.request.mockResolvedValueOnce({ payload: userID })

			await expect(gamesSDK.authorize()).resolves.toBe(userID)
			expect(emmiter.request).toHaveBeenCalledWith({ type: "@gameSDK:authorize" })
		})

		it("failure", async () => {
			const error = new Error("Some Error")
			emmiter.request.mockRejectedValueOnce(error)

			await expect(gamesSDK.authorize()).rejects.toBe(error)
		})
	})

	describe("requestEmail", () => {
		it("success", async () => {
			const email = "valid@email.com"
			emmiter.request.mockResolvedValueOnce({ payload: email })

			await expect(gamesSDK.requestEmail()).resolves.toBe(email)
			expect(emmiter.request).toHaveBeenCalledWith({ type: "@gameSDK:requestEmail" })
		})

		it("failure", async () => {
			const error = new Error("Some Error")
			emmiter.request.mockRejectedValueOnce(error)

			await expect(gamesSDK.requestEmail()).rejects.toBe(error)
		})
	})

	describe("purchase", () => {
		const sku = "postId1"

		it("success", async () => {
			gamesSDK.purchase(sku)
			expect(emmiter.send).toHaveBeenCalledWith({ type: "@gameSDK:purchase", payload: sku })
		})
	})

	describe("checkPurchases", () => {
		const skus = ["postId1", "postId2"]

		it("success", async () => {
			const response = { postId1: false, postId2: true }
			emmiter.request.mockResolvedValueOnce({ payload: response })

			await expect(gamesSDK.checkPurchases(skus)).resolves.toEqual(response)
			expect(emmiter.request).toHaveBeenCalledWith({ type: "@gameSDK:checkPurchases", payload: skus })
		})

		it("failure", async () => {
			const error = new Error("Some Error")
			emmiter.request.mockRejectedValueOnce(error)

			await expect(gamesSDK.checkPurchases(skus)).rejects.toBe(error)
		})
	})
})
