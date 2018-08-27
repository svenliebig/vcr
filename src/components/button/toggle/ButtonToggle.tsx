/** React Imports */
import React, { Component } from "react"

import "./ButtonToggle.less"

export interface Props {
    /** Classname of the button */
    className?: string
    /** Initial State */
    initial?: boolean
    /** Icon when toggle is on */
    activeIcon?: string
    /** Icon when toggle is off */
    inactiveIcon?: string
    /**  */
    tooltip?: string
    /** Text that is display before the toggle */
    text?: string
    /** Function that is called with the new value after the toggle is triggered, value is false | true */
    onClick(val: boolean): void
}

export interface State {
    toggled: boolean
    activeIcon: string
    inactiveIcon: string
}

/**
 * Component Class of ButtonToggle.
 *
 * @export
 * @class ButtonToggle
 * @extends {Component}
 */
export default class ButtonToggle extends Component<Props, State> {

    /**
	 * Creates an instance of ButtonToggle.
	 * @memberof ButtonToggle
	 */
    constructor(props: Props) {
        super(props)

        // TODO: Fuck my life, stateless PLS
        this.state = {
            toggled: props.initial || false,
            activeIcon: props.activeIcon || "fa fa-toggle-on",
            inactiveIcon: props.inactiveIcon || "fa fa-toggle-off"
        }

        this.toggle = this.toggle.bind(this)
    }

    componentWillReceiveProps(props: Props) {
        this.setState({
            activeIcon: props.activeIcon || "fa fa-toggle-on",
            inactiveIcon: props.inactiveIcon || "fa fa-toggle-off"
        })
    }

    toggle() {
        this.setState({
            toggled: !this.state.toggled
        }, () => {
            if (this.props.onClick) {
                this.props.onClick(this.state.toggled)
            }
        })
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof ButtonToggle
	 */
    render() {
        return (
            <button
                className={`button-toggle ${this.props.className}`}
                onClick={this.toggle}
                title={this.props.tooltip}
            >
                {this.props.text ? <span>{this.props.text} </span> : ""}
                <span className={this.state.toggled ? this.state.activeIcon : this.state.inactiveIcon}></span>
            </button>
        )
    }
}