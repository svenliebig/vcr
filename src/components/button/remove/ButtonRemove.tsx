/** React Imports */
import React, { Component } from "react"
import "./ButtonRemove.less"

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
        return <button className="button--remove" title="Serie Löschen" onClick={this.props.onClick}>
            <span className="fa fa-trash" />
        </button>
    }
}