/** React Imports */
import React, { Component, ChangeEvent, KeyboardEvent } from "react"

import { Subject } from "rxjs/Subject"
import "rxjs/add/operator/debounceTime"

import "./InputText.less"

export interface Props {
    id: string
    value: string
    throttled?: number
    label?: string
    placeholder?: string
    type?: "password"
    onChange(value: string, id: string): void
    onEnter?(value: string): void
}

export interface State {
    value: string
}

/**
 * Component Class of InputText.
 *
 * @export
 * @class InputText
 * @extends {Component}
 */
export default class InputText extends Component<Props, State> {
    private observer: Subject<{}>

    /**
	 * Creates an instance of InputText.
	 * @memberof InputText
	 */
    constructor(props: Props) {
        super(props)

        this.state = {
            value: props.value || ""
        }

        this.observer = new Subject()
        this.onChange = this.onChange.bind(this)

        this.observer.debounceTime(props.throttled || 0).subscribe(() => {
            this.props.onChange(this.state.value, this.props.id)
        })
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ value: nextProps.value })
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof InputText
	 */
    render() {
        return (
            <div className="input-text--wrapper">
                {this.props.label ?
                    <label htmlFor={this.props.id} className="input-text--label">
                        {this.props.label}
                    </label>
                    : ""}
                <input
                    id={this.props.id}
                    className="input-text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    onKeyPress={this.handleKeypress.bind(this)}
                />
            </div>
        )
    }

    private onChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        this.setState({ value })
        if (this.props.onChange) {
            this.observer.next(value)
        }
    }

    private handleKeypress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && this.props.onEnter) {
            this.props.onEnter(this.props.value)
        }
    }
}