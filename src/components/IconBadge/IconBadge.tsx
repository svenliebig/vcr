import React, { Component } from "react"
import "./IconBadge.less"

export interface Props {
    icon: string
    counter: number
    onClick?(): void
}

/**
 * Component Class of IconBadge.
 *
 * @export
 * @class IconBadge
 * @extends {Component}
 */
export default class IconBadge extends Component<Props> {
    render() {
        return (
            <div role="button" className={`iconbadge ${this.props.icon}`} onClick={this.props.onClick} tabIndex={0} onKeyDown={() => { }}>
                {this.props.counter !== 0 ?
                    <span className="badge">{this.props.counter < 10 ? this.props.counter : "9+"}</span>
                    :
                    ""}
            </div>
        )
    }
}