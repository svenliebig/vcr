import React, { Component } from "react"
import Tooltip from "../../Tooltip"

import "./Mail.less"
import Button from "@components/button/Button"

export interface Props {
    onClick(): void
}

/**
 * Component Class of Mail.
 *
 * @export
 * @class Mail
 * @extends {Component}
 */
export default class Mail extends Component<Props> {
    render() {
        return (
            <Tooltip text="Serie empfehlen">
                <Button icon="button--mail" onClick={this.props.onClick}>
                    <span className="fa fa-envelope-o"></span>
                </Button>
            </Tooltip>
        )
    }
}