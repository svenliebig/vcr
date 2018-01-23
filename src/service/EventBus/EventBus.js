export default class EventBus {
	constructor() {
		this.events = {}
	}

	register(event, callback) {
		if (Object.getOwnPropertyNames(this.events).indexOf(event) === -1) {
			this.events[event] = callback
		} else {
			throw ("Allready registered emit event")
		}
	}

	emit(event, ...args) {
		if (Object.getOwnPropertyNames(this.events).indexOf(event) !== -1) {
			return this.events[event].apply(this, args)
		}
	}

	/**
	 * @returns {EventBus}
	 */
	static get instance() {
		return this._instance
	}

	static set instance(instance) {
		this._instance = instance
	}

}

EventBus.instance = new EventBus()