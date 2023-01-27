export type UserID = string
export type UserEmail = string
export type PostID = string

export enum IframeActionKind {
	Authorize = "@gameSDK:authorize",
	RequestEmail = "@gameSDK:requestEmail",
	Purchase = "@gameSDK:purchase",
	CheckPurchases = "@gameSDK:checkPurchases",
}

export type IframeAction = {
	type: string
	payload?: any
	error?: string
}
