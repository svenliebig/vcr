import React, { Component, createContext } from "react"

export enum SidebarContentType {
    Empty = "Oh oh! 🤣",
    Messages = "Nachrichten 📧"
}

export interface SidebarContext {
    isSidebarOpen(): boolean
    showSidebar(): void
    hideSidebar(): void
    setContentType(type: SidebarContentType): void
    getContentType(): SidebarContentType | null
}

const defaultValue: SidebarContext = {
    setContentType: () => {
        throw new Error("<SidebarProvider /> is not provided")
    },
    getContentType: () => {
        throw new Error("<SidebarProvider /> is not provided")
    },
    isSidebarOpen: () => {
        throw new Error("<SidebarProvider /> is not provided")
    },
    hideSidebar: () => {
        throw new Error("<SidebarProvider /> is not provided")
    },
    showSidebar: () => {
        throw new Error("<SidebarProvider /> is not provided")
    }
}

const sidebarContext: any = createContext(defaultValue)

interface SidebarProviderState {
    visible: boolean
    content: SidebarContentType
}

export class SidebarProvider extends Component<{}, SidebarProviderState> {
    state: SidebarProviderState = {
        visible: localStorage.getItem(this.localStorageKey) === "true",
        content: SidebarContentType.Empty
    }

    render() {
        const context: SidebarContext = {
            getContentType: this.getContentType,
            setContentType: this.setContentType,
            isSidebarOpen: this.isSidebarOpen,
            hideSidebar: this.hideSidebar,
            showSidebar: this.showSidebar
        }

        return <sidebarContext.Provider value={context}>{this.props.children}</sidebarContext.Provider>
    }

    private getContentType = () => this.state.content
    private setContentType = (content: SidebarContentType) => this.setState({ content })

    private isSidebarOpen = () => this.state.visible

    private showSidebar = () => {
        this.setState({ visible: true },
            this.saveState
        )
    }

    private hideSidebar = () => {
        this.setState({ visible: false },
            this.saveState
        )
    }

    private saveState = () => localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.visible))

    private get localStorageKey() {
        return `sidebar-state`
    }
}

const WithSidebar = sidebarContext.Consumer

export function withSidebar<P>(Comp: any): React.ComponentType<P> {
    return (props: P) => <WithSidebar>{(context: SidebarContext) => <Comp {...context} {...props} />}</WithSidebar>
}