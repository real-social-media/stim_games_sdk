import IframeEmmiter from "./IframeEmmiter"
import GamesSDK from "./GamesSDK"

export { IframeActionKind, IframeAction } from "./actions"
export * as actions from "./actions"

const emmiter = new IframeEmmiter(window.parent)

export default new GamesSDK(emmiter)
