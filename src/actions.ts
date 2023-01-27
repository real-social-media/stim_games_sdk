import { PostID, IframeActionKind, IframeAction } from "./types"

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
	type: IframeActionKind.CheckPurchases,
	payload: skus,
})
