import React, { Component, ReactNode } from "react"
import "./Tabs.less"

export interface Props {
    defaultActiveTabIndex: number
    className?: string,
    children: ReactNode
}

export interface State {
    activeTabIndex: number
}

/**
 * Component Class of Tabs.
 *
 * @export
 * @class Tabs
 * @extends {Component}
 */
export class Tabs extends Component<Props, State> {

    /**
	 * Creates an instance of Tabs.
	 * @memberof Tabs
	 */
    constructor(props: Props) {
        super(props)

        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex
        }

        this.handleTabClick = this.handleTabClick.bind(this)
    }

    handleTabClick(tabIndex: number) {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        })
    }

    renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child as any, {
                onClick: this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            })
        })
    }

    // Render current active tab content
    renderActiveTabContent() {
        const { children } = this.props
        const { activeTabIndex } = this.state
        if ((children as any)[activeTabIndex]) {
            return (children as any)[activeTabIndex].props.children
        }
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Tabs
	 */
    render() {
        return (
            <div className={`tabs ${this.props.className}`}>
                <ul className="tabs-nav nav navbar-nav navbar-left">
                    {this.renderChildrenWithTabsApiAsProps()}
                </ul>
                <div className="tabs-active-content">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        )
    }
}

export interface TabProps {
    icon?: string
    title?: string
    className?: string
    isActive?: boolean
    tabIndex?: number
    onClick?(index: number): void
}

export class Tab extends Component<TabProps> {
    render() {
        return (
            <li className={`tab ${this.props.className}`}>
                <button className={`tab-link ${this.props.isActive ? "active" : ""}`}
                    onClick={(event) => {
                        event.preventDefault()
                        this.props.onClick!(this.props.tabIndex!)
                    }}
                >
                    <i className={`tab-icon ${this.props.icon}`} />
                    <div>{this.props.title}</div>
                </button>
            </li>
        )
    }
}