import { IframeAction } from "./types"

export interface EmmiterInterface {
	send(action: IframeAction): void
	request(action: IframeAction): Promise<IframeAction | never>
}

type PromisedAction = {
	resolve(action: IframeAction): void
	reject(error: string): void
}

type PromiseQueue = {
	[key: string]: Array<PromisedAction>
}

class IframeEmmiter implements EmmiterInterface {
	private target: Window
	private requests: PromiseQueue = {}

	constructor(target: Window) {
		this.target = target
		window.addEventListener("message", this.response.bind(this))
	}

	private parseAction(event: MessageEvent): IframeAction {
		try {
			return JSON.parse(event.data)
		} catch (error) {
			return { type: "NOT_SUPPORTED" }
		}
	}

	private response(event: MessageEvent) {
		const action = this.parseAction(event)
		const requests = this.requests[action.type]

		if (requests) {
			requests.forEach(({ resolve, reject }) => {
				if (action?.error) {
					reject(action.error)
				} else {
					resolve(action)
				}
			})

			this.requests[action.type] = []
		}
	}

	send(action: IframeAction): void {
		this.target.postMessage(JSON.stringify(action), "*")
	}

	request(action: IframeAction): Promise<IframeAction | never> {
		return new Promise((resolve, reject) => {
			if (!this.requests[action.type]) {
				this.requests[action.type] = []
			}

			this.requests[action.type].push({ resolve, reject })
			this.send(action)
		})
	}
}

export default IframeEmmiter
