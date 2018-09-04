import React, { Component } from "react"

// Model
import SeriesModel from "vcr-shared/models/SeriesModel"

// Components
import IconBadge from "@components/IconBadge/IconBadge"
import SeriesCard from "@components/SeriesCard/SeriesCard"

// Service
import EventBus from "@service/EventBus/EventBus"

// CSS
import "./Options.less"
import MessageModel from "@model/MessageModel"

export interface State {
    settings: boolean
    showMessages: boolean
    messages: Array<MessageModel>
    seriesMessages: Array<SeriesModel>
}

class Options extends Component<{}, State> {
    constructor(props: {}) {
        super(props)

        this.state = {
            settings: false,
            showMessages: false,
            messages: [],
            seriesMessages: []
        }

        this.logout = this.logout.bind(this)
        this.settings = this.settings.bind(this)
    }

    componentDidMount() {
        EventBus.instance.emit("getMessages").then((val: Array<any>) => {
            const seriesMessages: Array<SeriesModel> = []
            val.forEach((message: { series: number }, i: number) => EventBus.instance.emit("getSeries", message.series).then((series: SeriesModel) => {
                seriesMessages.push(series)
                if (i === val.length - 1) {
                    this.setState({ seriesMessages, messages: val })
                }
            }))
        })
    }

    render() {
        const renderMessages = () => {
            if (this.state.showMessages) {
                return this.state.messages.map((message, i) =>
                    <div key={i} className="suggestion">
                        <SeriesCard series={this.state.seriesMessages[i]}>
                            <div className="actions">
                                <button onClick={this.addSeries.bind(this, this.state.seriesMessages[i], i)}><span className="fa fa-plus" /></button>
                                <span className="from">Von: {message.from}</span>
                                <button className="remove-message" onClick={this.removeMessage.bind(this, i)}>
                                    <span className="fa fa-times" />
                                </button>
                            </div>
                        </SeriesCard>
                    </div>
                )
            }
            return undefined
        }

        return (
            <div className="options-wrapper">
                <div className="options-container">
                    <IconBadge icon="fa fa-envelope-o" counter={this.state.messages.length} onClick={this.toggleMessages.bind(this)} />
                    <button onClick={this.settings} title="Einstellungen">
                        <span className="fa fa-cog" />
                    </button>
                    <button onClick={this.logout} title="Ausloggen">
                        <span className="fa fa-power-off" />
                    </button>
                </div>
                <div className="messages">
                    {renderMessages()}
                </div>
            </div>
        )
    }

    private logout() {
        EventBus.instance.emit("logout")
    }

    private settings() {
        document.getElementsByClassName("dialog-container")[0].classList.add("visible")
    }

    private toggleMessages() {
        this.setState({ showMessages: !this.state.showMessages })
    }

    private addSeries(_series: SeriesModel, index: number) {
        EventBus.instance.emit("addSeries", _series.id).then(() => this.removeMessage(index))
    }

    private removeMessage(index: number) {
        const clear = this.state.messages.splice(index, 1)
        this.state.seriesMessages.splice(index, 1)
        this.setState({ messages: this.state.messages, seriesMessages: this.state.seriesMessages },
            () => EventBus.instance.emit("clearMessage", clear)
        )
    }
}

export default Options
