import IframeEmmiter from "./IframeEmmiter"
import GamesSDK from "./GamesSDK"
import * as actions from "./actions"

export { IframeActionKind, IframeAction } from "./types"
export { actions }

// @ts-ignore
const target = window?.ReactNativeWebView || window.parent
const emmiter = new IframeEmmiter(target)

export default new GamesSDK(emmiter)
