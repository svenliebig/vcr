import Button from "@components/button/Button"
import EventBus from "@service/EventBus/EventBus"
import React, { ChangeEvent, Component } from "react"
import "./SuggestionWidget.less"

export interface Props {
    seriesId: number
}

export interface State {
    message: string
    selected: string
    processing: boolean
    userOptions: Array<{ uid: string, name: string }>
}

export default class SuggestionWidget extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            selected: "",
            processing: false,
            userOptions: [],
            message: ""
        }

        EventBus.instance.emit("getUserDirectory").then((userOptions: Array<{ uid: string, name: string }>) => {
            this.setState({ userOptions })
        })
    }

    render() {
        return (
            <div className="suggestion-widget">
                <div className="suggestion-widget--form">
                    <Button icon="fa fa-envelope-o" onClick={this.suggestSeries.bind(this)} />
                    <select onChange={this.handleInput} value={this.state.selected}>
                        <option value="">(Serie Empfehlen)</option>
                        {this.state.userOptions.map((v) => <option key={v.uid} value={v.name}>{v.name}</option>)}
                    </select>
                </div>
                <span>{this.state.message}</span>
            </div>
        )
    }

    handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selected: e.target.value })
    }

    suggestSeries() {
        if (!this.state.processing) {
            if (this.state.selected === "") {
                return this.setState({ message: "Wähle einen Nutzer aus um ihm diese Serie zu empfehlen." })
            }

            this.setState({ processing: true, message: "Empfehlung wird verschickt..." })
            EventBus.instance.emit("writeMessage", this.props.seriesId, this.state.selected).then(() => {
                this.setState({ selected: "", processing: false, message: `Du hast ${this.state.selected} diese Serie empfohlen.` })
            })
        }
    }
}