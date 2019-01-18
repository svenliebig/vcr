import React, { Component, ComponentClass } from "react"
import { SidebarContext, withSidebar } from "./SiderbarContext"
import IconButton from "@components/button/IconButton"
import "./Sidebar.less"
import SidebarContent from "./SidebarContent"

class Sidebar extends Component<SidebarContext> {
    render() {
        return <div className={this.classNames}>
            <div className="sidebar-content">
                <div className="sidebar-header d-flex justify-content-between">
                    <IconButton icon="fa fa-arrow-right fa-2x" onClick={this.props.hideSidebar} />
                    <h3 className="my-0">{this.props.getContentType()}</h3>
                </div>
                <hr />
                <SidebarContent />
            </div>
        </div>
    }

    private get classNames(): string {
        const { isSidebarOpen } = this.props
        return `sidebar-container ${isSidebarOpen() ? "sidebar-expanded" : "sidebar-collapsed"}`
    }
}

export default withSidebar(Sidebar) as ComponentClass