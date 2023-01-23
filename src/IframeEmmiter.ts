import { IframeAction } from "./actions"

export interface EmmiterInterface {
	send(action: IframeAction): void
	request(action: IframeAction): Promise<IframeAction | never>
}

type PromiseQueue = {
	[key: string]: Array<Promise<IframeAction>>
}

class IframeEmmiter implements EmmiterInterface {
	private target: Window
	private requests: PromiseQueue = {}

	constructor(target: Window) {
		this.target = target
		window.addEventListener("message", this.response.bind(this))
	}

	private response(event: MessageEvent) {
		const action: IframeAction = event.data
		const requests = this.requests[action.type]

		if (requests) {
			// @ts-ignore
			requests.forEach(res => res(action))

			this.requests[action.type] = []
		}
	}

	send(action: IframeAction): void {
		this.target.postMessage(action, "*")
	}

	request(action: IframeAction): Promise<IframeAction | never> {
		return new Promise(res => {
			if (!this.requests[action.type]) {
				this.requests[action.type] = []
			}

			// @ts-ignore
			this.requests[action.type].push(res)
			this.send(action)
		})
	}
}

export default IframeEmmiter
