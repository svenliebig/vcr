export default class EventBus {
    public static instance: EventBus = new EventBus()
    private events: any = {}

    constructor() {
        this.events = {}
    }

    register(event: string, callback: (...args: Array<any>) => void) {
        if (Object.getOwnPropertyNames(this.events).indexOf(event) === -1) {
            this.events[event] = callback
        } else {
            throw ("Allready registered emit event")
        }
    }

    emit(event: string, ...args: Array<any>) {
        if (Object.getOwnPropertyNames(this.events).indexOf(event) !== -1) {
            return this.events[event].apply(this, args)
        }
    }
}