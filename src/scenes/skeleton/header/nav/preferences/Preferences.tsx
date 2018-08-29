import React, { Component } from "react"
import Dialog from "@components/dialog/Dialog"
import InputText from "@components/Input/Text/InputText"
import EventBus from "@service/EventBus/EventBus"

export default class Preferences extends Component<{}, { name: string | null }> {
    constructor(props: {}) {
        super(props)

        this.state = {
            name: null
        }

        EventBus.instance.emit("getName").then((name: string) => this.setState({ name: name || "empty" }))
    }

    render() {
        return (
            <Dialog title="Einstellungen">
                {this.state.name ? <InputText id="name-input" value={this.state.name} label="Name" onChange={this.changed.bind(this)} throttled={500} /> : ""}
            </Dialog>
        )
    }

    private changed(val: string) {
        EventBus.instance.emit("setName", val)
    }
}