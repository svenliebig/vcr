import React, { Component } from "react"
import EventBus from "@service/EventBus/EventBus"
import "./Options.less"
import MessageIcon from "@components/sidebar/MessageIcon"

export interface State {
    settings: boolean
}

class Options extends Component<{}, State> {
    constructor(props: {}) {
        super(props)

        this.state = {
            settings: false,
        }

        this.logout = this.logout.bind(this)
        this.settings = this.settings.bind(this)
    }

    render() {
        return <div className="options-wrapper">
                <div className="options-container">
                    <MessageIcon />
                    <button onClick={this.settings} title="Einstellungen">
                        <span className="fa fa-cog" />
                    </button>
                    <button onClick={this.logout} title="Ausloggen">
                        <span className="fa fa-power-off" />
                    </button>
                </div>
            </div>
    }

    private logout() {
        EventBus.instance.emit("logout")
    }

    private settings() {
        document.getElementsByClassName("dialog-container")[0].classList.add("visible")
    }
}

export default Options
