import MessageModel from "@model/MessageModel"
import ServiceFactory from "@utils/ServiceFactory"
import React, { Component } from "react"
import "./SidebarMessages.less"
import SeriesCard from "@components/SeriesCard/NewSeriesCard"

export interface Props {
    children?: React.ReactNode
}

export interface State {
    messages: Array<MessageModel>
}

export default class SidebarMessages extends Component<Props, State> {
    private userRepository = ServiceFactory.user
    private messageRepository = ServiceFactory.message
    private seriesApi = ServiceFactory.seriesApi
    private seriesRepository = ServiceFactory.series

    public state: State = {
        messages: []
    }

    constructor(p: Props) {
        super(p)
        this.userRepository.getName()
            .then(name => this.messageRepository.getMessages(name))
            .then(messages => this.setState({ messages }))
    }
    
    render() {
        const { messages } = this.state
        if (messages.length === 0) {
            return "Keine Nachrichten 😢"
        }
        return this.state.messages.map((message, i) => <div key={i} className="suggestion">
            <SeriesCard series={message.series}>
                <div className="actions">
                    <button onClick={() => this.addSeries(message.series, i)}><span className="fa fa-plus" /></button>
                    <span className="from">Von: {message.from}</span>
                    <button className="remove-message" onClick={this.removeMessage.bind(this, i)}>
                        <span className="fa fa-times" />
                    </button>
                </div>
            </SeriesCard>
        </div>)
    }

    private addSeries(id: number, index: number) {
        this.seriesApi.getCompleteSeries(id).then(series => {
            this.userRepository.addSeries(series)
            this.seriesRepository.addSeries(series)
            this.removeMessage(index)
            return series
        })
    }

    private removeMessage(index: number) {
        const clear = this.state.messages.splice(index, 1)
        this.state.messages.splice(index, 1)
        this.setState({ messages: this.state.messages },
            () => this.messageRepository.clearMessage(clear.toString())
        )
    }
}