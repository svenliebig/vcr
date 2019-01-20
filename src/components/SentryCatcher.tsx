import * as React from "react"
import * as Sentry from "@sentry/browser"

import "./SentryCatcher.less"
import environment from "@environment/environment"

export interface Props {
    children: React.ReactNode
}

export interface State {
    error: any
}

export default class SentryCatcher extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { error: null }
    }

    componentDidCatch(error: any, errorInfo: any) {
        if (process.env.NODE_ENV === "production") {

            this.setState({ error })
            Sentry.configureScope(scope => {
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key])
                })
            })
            
            if (environment.production) {
                Sentry.captureException(error)
            }
        } else {
            throw new Error(error + errorInfo)
        }
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return <div className="sentry-catcher-container">
                <img src="/assets/error-ruffy.jpg" />
                <p>
                    Das sollte nicht passieren,<br />aber ich habe eine Mail mit dem Error bekommen.<br />Falls du noch etwas ergänzen möchtests kannst<br />du das mit diesem Report hier tun:
                </p>
                <button onClick={() => Sentry.showReportDialog()}>Error Report Erstellen</button>
            </div>
        } else {
            //when there's not an error, render children untouched
            return this.props.children
        }
    }
}