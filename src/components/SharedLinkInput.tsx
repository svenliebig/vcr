import React, { Component, ChangeEvent } from "react"

export interface Props {
    type: string
    value: string
    onChange?(type: string, value: string): void
}

import "./SharedLinkInput.less"

export default class SharedLinkInput extends Component<Props> {
    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (this.props.onChange) {
            this.props.onChange(this.props.type, value)
        }
    }

    render() {
        const { type } = this.props
        return <div className="row">
            <div className="col col-12">
                <div className="shared-link">
                    <label htmlFor={`shared-link--${type}`}>
                        <img src={`/assets/${type}.jpg`} width="30" height="30" />
                    </label>
                    <input value={this.props.value} id={`shared-link--${type}`} placeholder={type} onChange={this.handleChange} />
                    <div className={`shared-link--caption ${type}`} />
                </div>
            </div>
        </div>
    }
}