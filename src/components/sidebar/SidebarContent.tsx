import React, { Component, ComponentClass } from "react"
import { SidebarContext, withSidebar, SidebarContentType } from "./SiderbarContext"
import SidebarMessages from "./SidebarMessages"

class SidebarContent extends Component<SidebarContext> {
    render() {
        const { getContentType } = this.props

        switch(getContentType()) {
            case SidebarContentType.Messages:
                return <SidebarMessages />
            default:
                return <div>Sry! Feature wird noch nicht Supported.</div>
        }
    }
}

export default withSidebar(SidebarContent) as ComponentClass