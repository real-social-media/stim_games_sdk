import IframeEmmiter from "./IframeEmmiter"
import GamesSDK from "./GamesSDK"
import * as actions from "./actions"

export { IframeActionKind, IframeAction } from "./types"
export { actions }

const emmiter = new IframeEmmiter(window.parent)

export default new GamesSDK(emmiter)
