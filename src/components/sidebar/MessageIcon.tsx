import React, { Component, ComponentClass } from "react"
import { SidebarContext, withSidebar, SidebarContentType } from "./SiderbarContext"
import IconBadge from "@components/IconBadge/IconBadge"
import ServiceFactory from "@utils/ServiceFactory"

export interface State {
    amount: number
}

class MessageIcon extends Component<SidebarContext, State> {
    private userRepository = ServiceFactory.user
    private messageRepository = ServiceFactory.message
    public state: State = {
        amount: 0
    }

    constructor(p: SidebarContext) {
        super(p)
        this.userRepository.getName().then(name => this.messageRepository.getMessageAmount(name)).then(amount => this.setState({ amount }))
    }

    shouldComponentUpdate(_: SidebarContext, state: State) {
        return state.amount !== this.state.amount
    }

    showSidebarSetContent = () => {
        const { showSidebar, setContentType } = this.props
        showSidebar()
        setContentType(SidebarContentType.Messages)
    }
    
    render() {
        const { amount } = this.state
        return <IconBadge icon="fa fa-envelope-o" counter={amount} onClick={this.showSidebarSetContent} />
    }
}

export default withSidebar(MessageIcon) as ComponentClass