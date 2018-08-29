import React, { MouseEvent } from "react"

export interface Props {
    children?: React.ReactNode
    icon?: string
    onClick(event: MouseEvent<HTMLButtonElement>): void
}

export default class Button extends React.Component<Props> {
    render() {
        const {
            onClick
        } = this.props

        return <button
            className={this.className}
            onClick={onClick}
        >
            {this.props.children}
        </button>
    }

    private get className(): string {
        const classNames: Array<string> = []

        const {
            icon
        } = this.props

        if (icon) {
            classNames.push(icon)
        }

        return classNames.join(" ")
    }
}