import { PostID } from "./types"

export enum IframeActionKind {
	Authorize = "authorize",
	RequestEmail = "requestEmail",
	Purchase = "purchase",
	CHECK_PURCHASES = "checkPurchases",
}

export type IframeAction = {
	type: string
	payload?: any
}

export const authorize = (): IframeAction => ({
	type: IframeActionKind.Authorize,
})

export const requestEmail = (): IframeAction => ({
	type: IframeActionKind.RequestEmail,
})

export const purchase = (sku: PostID): IframeAction => ({
	type: IframeActionKind.Purchase,
	payload: sku,
})

export const checkPurchases = (skus: Array<PostID>): IframeAction => ({
	type: IframeActionKind.CHECK_PURCHASES,
	payload: skus,
})
