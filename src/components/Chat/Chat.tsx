/** React Imports */
import React, { Component, MouseEvent } from "react"

import "./Chat.less"
import EventBus from "@service/EventBus/EventBus"
import environment from "@environment/environment"
import InputText from "@components/Input/Text/InputText"

export interface State {
    users: Array<any>,
    collapsed: boolean,
    input: string,
    messages: Array<any>,
    websocketonline: boolean
}

export default class Chat extends Component<{}, State> {
    private messageContainer: HTMLDivElement | null = null
    private connection: WebSocket
    private username: string = ""

    constructor(props: {}) {
        super(props)

        this.state = {
            users: [],
            collapsed: true,
            input: "",
            messages: [],
            websocketonline: false
        }

        this.connection = new WebSocket(environment.websocketurl)
        EventBus.instance.emit("getName").then((name: string) => this.username = name)
    }

    componentDidMount() {

        this.connection.onopen = () => {
            this.connection.send(JSON.stringify({ context: "clientConnection", value: this.username }))
            this.setState({ websocketonline: true })
        }

        this.connection.onmessage = (e) => {
            this.handleMessage(e.data)
        }

        this.connection.onclose = () => {
            this.connection.send(this.username)
            this.setState({ websocketonline: false })
        }
    }

    click(event: MouseEvent<HTMLDivElement>) {
        if ((event.target as any).id !== "chat-input") {
            this.setState({ collapsed: !this.state.collapsed }, () => {
                this.messageContainer!.scrollTop = this.messageContainer!.scrollHeight
            })
        }
    }

    handleMessage(incomingMessage: string) {
        let message
        try {
            message = JSON.parse(incomingMessage)
        } catch (e) {
            console.error("Error trying to parse the json data. %s", e)
            return
        }

        switch (message.context) {
            case "clients":
                this.setState({ users: message.value })
                break
            case "message":
                this.setState({ messages: message.value })
                break
            default:
                break
        }
    }

    handleEnter(value: string) {
        this.connection.send(JSON.stringify({ context: "newMessage", value: { user: this.username, message: value } }))
        this.setState({ input: "" })
    }

    handleInput(input: string) {
        this.setState({ input })
    }

    handleSendMessage(message: string) {
        this.setState({ input: "" }, () => {
            const newMessage = { user: this.username, message }
            this.connection.send(JSON.stringify(newMessage))
        })
    }

    render() {
        return (
            <div className="chat-container">
                <div role="button" onKeyDown={() => { }} className="connection-head" onClick={this.click.bind(this)} tabIndex={0}>
                    <div className={`connection-symbol ${this.state.websocketonline ? "online" : "offline"}`} />
                    <div className="connections-amount">
                        {this.state.users.filter(user => user.online).length}
                    </div>
                </div>
                <div className={`collapsable ${this.state.collapsed ? "collapsed" : ""}`}>
                    <div className="userList">
                        {this.state.users.map((val, i) =>
                            <div key={i} className="chat-user">
                                <div className={`connection-symbol ${val.online ? "online" : "offline"}`} />
                                <a href={`/compare/${val.name}`}>{val.name}</a>
                            </div>)}
                    </div>
                    <div className="chat-messages-container">
                        <div className="chat-messages" ref={(element) => this.messageContainer = element}>
                            {this.state.messages.map((val, i) =>
                                <div key={i} className="chat-message">
                                    <div className="chat-message-writer">
                                        {val.user}:
                                    </div>
                                    <div className="chat-message-content">
                                        {val.message}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="chat-input-container">
                            <InputText id="chat-input" onChange={this.handleInput.bind(this)} value={this.state.input} onEnter={this.handleEnter.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}