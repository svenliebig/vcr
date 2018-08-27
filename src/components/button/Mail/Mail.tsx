import React, { Component } from "react"
import Tooltip from "../../Tooltip"

import "./Mail.less"

export interface Props {
    onClick(): void
}

/**
 * Component Class of ButtonRemove.
 *
 * @export
 * @class ButtonRemove
 * @extends {Component}
 */
export default class ButtonRemove extends Component<Props> {
    render() {
        return (
            <Tooltip text="Serie empfehlen">
                <button className="button--mail" onClick={this.props.onClick}>
                    <span className="fa fa-envelope-o"></span>
                </button>
            </Tooltip>
        )
    }
}