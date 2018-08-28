/** React Imports */
import React, { Component, ReactNode } from "react"
import "./Dialog.less"

const ANIM_IN = "slide-in-elliptic-top-fwd"
const ANIM_OUT = "slide-out-elliptic-top-bck"

export interface Props {
    children: ReactNode
    title?: string
    visible?: boolean
}

export interface State {
    visible: boolean
    fadeout: boolean
    className: string
    classNameDialog: string
    classNameContainer: string
}

/**
 * Component Class of Dialog.
 *
 * @export
 * @class Dialog
 * @extends {Component}
 */
export default class Dialog extends Component<Props, State> {

    /**
	 * Creates an instance of Dialog.
	 * @memberof Dialog
	 */
    constructor(props: Props) {
        super(props)

        this.state = {
            visible: props.visible || false,
            fadeout: false,
            className: "",
            classNameDialog: props.visible ? ANIM_IN : "",
            classNameContainer: props.visible ? "fadein" : ""
        }

        this.fadeout = this.fadeout.bind(this)
        this.getContainerClass = this.getContainerClass.bind(this)
    }

    componentDidMount() {
        // this.setState({})
    }

    show() {
        this.setState({
            visible: true
        })
    }

    fadeout(e: any) {
        if (!e.target.classList.contains("dialog-container")) {
            return
        }
        this.setState({
            fadeout: true,
            className: ANIM_OUT
        }, () => {
            const self = this
            setTimeout(() => {
                self.setState({
                    fadeout: false,
                    visible: false
                })
                const dialog = document.getElementsByClassName("dialog-container")[0]
                if (dialog) {
                    if (dialog.classList.contains("visible")) {
                        dialog.classList.remove("visible")
                    }
                }
            }, 700)
        })
    }

    getContainerClass() {
        let className = "dialog-container"
        if (this.state.fadeout) {
            className += " fadeout"
        }
        const dialog = document.getElementsByClassName("dialog-container")[0]
        if (dialog) {
            if (dialog.classList.contains("visible")) {
                className += " visible"
            }
        }
        return className
    }

    getDialogClass() {
        let className = "dialog"
        if (this.state.fadeout) {
            className += ` ${ANIM_OUT}`
        } else {
            className += ` ${ANIM_IN}`
        }
        const dialog = document.getElementsByClassName("dialog-container")[0]
        if (dialog) {
            if (dialog.classList.contains("visible")) {
                className += " visible"
            }
        }
        return className
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Dialog
	 */
    render() {
        return (
            <div role="button" className={this.getContainerClass()} onClick={this.fadeout} onKeyDown={() => { }} tabIndex={0}>
                <div className={this.getDialogClass()}>
                    {this.props.title &&
                        <div className="dialog-header">
                            {this.props.title}
                        </div>
                    }
                    <div className="dialog-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}