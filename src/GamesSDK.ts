import { EmmiterInterface } from "./IframeEmmiter"
import { UserID, UserEmail, PostID } from "./types"
import * as actions from "./actions"

class GamesSDK {
	constructor(private emmiter: EmmiterInterface) {}

	async authorize(): Promise<UserID> {
		const action = await this.emmiter.request(actions.authorize())

		return action.payload
	}

	async requestEmail(): Promise<UserEmail> {
		const action = await this.emmiter.request(actions.requestEmail())

		return action.payload
	}

	async purchase(sku: PostID): Promise<void> {
		await this.emmiter.send(actions.purchase(sku))
	}

	async checkPurchases(skus: Array<PostID>): Promise<any> {
		const action = await this.emmiter.request(actions.checkPurchases(skus))

		return action.payload
	}
}

export default GamesSDK
