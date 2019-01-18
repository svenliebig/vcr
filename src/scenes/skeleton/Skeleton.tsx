import React, { Component, ComponentClass, ReactNode } from "react"
import Header from "./header/Header"
import Sidebar from "@components/sidebar/Sidebar"
import { SidebarProvider, withSidebar, SidebarContext } from "@components/sidebar/SiderbarContext"
import "./Skeleton.less"

export interface Props {
    children: ReactNode
    dontRenderHeader?: boolean
}

const MainWrapper = ({ isSidebarOpen, children }: SidebarContext & { children: ReactNode }) => {
    return <div className={`main-wrapper ${isSidebarOpen() ? "sidebar-expanded" : "sidebar-collapsed"}`}>
        {children}
    </div>
}

const MainWrapperWithSidebar = withSidebar(MainWrapper) as ComponentClass

/**
 *
 *
 * @export
 * @class Skeleton
 * @extends {Component}
 */
export default class Skeleton extends Component<Props> {
    render() {
        return <SidebarProvider>
            <MainWrapperWithSidebar>
                {this.props.dontRenderHeader ? "" : <Header />}
                <main className="container-fluid mb-1">
                    {this.props.children}
                </main>
            </MainWrapperWithSidebar>
            <Sidebar />
        </SidebarProvider>
    }
}