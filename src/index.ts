import IframeEmmiter from "./IframeEmmiter"
import GamesSDK from "./GamesSDK"

const emmiter = new IframeEmmiter(window.parent)

export default new GamesSDK(emmiter)
