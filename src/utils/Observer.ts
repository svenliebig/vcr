export default class Observer {
    private throttle: number = 0
    private subscribedFuncion: Function | null = null
    private timeout: any

    public next(...args: Array<any>): Observer {
        if (this.throttle) {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.callSubscribedFunction(args)
            }, this.throttle)
        } else {
            this.callSubscribedFunction(args)
        }
        return this
    }

    public throttled(ms: number): Observer {
        this.throttle = ms
        return this
    }

    public subscribe(fn: (...args: Array<any>) => void): Observer {
        this.subscribedFuncion = fn
        return this
    }

    private callSubscribedFunction(...args: Array<any>) {
        if (this.subscribedFuncion) {
            this.subscribedFuncion.apply(this.subscribedFuncion, args)
        }
    }
}