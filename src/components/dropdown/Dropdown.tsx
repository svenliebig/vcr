import React, { Component } from "react"
import "./Dropdown.less"

export interface Props {
    // FIXME should be onClick
    selected: any
    list: Array<any>
    onclick(val: any): void
    // FIXME should not be required
}

export interface State {
    listVisible: boolean
    selected: any
}

/**
 * Component Class of Dropdown.
 *
 * @export
 * @class Dropdown
 * @extends {Component}
 */
export default class Dropdown extends Component<Props, State> {

    /**
	 * Creates an instance of Dropdown.
	 * @memberof Dropdown
	 */
    constructor(props: Props) {
        super(props)

        this.state = {
            listVisible: false,
            selected: props.selected
        }

        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.select = this.select.bind(this)
    }

    /**
	 * Called after the constructor.
	 *
	 * @memberof Dropdown
	 */
    componentDidMount() {
    }

    select(item: any) {
        this.setState({ selected: item })
        this.props.onclick(item)
    }

    show() {
        this.setState({ listVisible: true })
        document.addEventListener("click", this.hide)
    }

    hide() {
        this.setState({ listVisible: false })
        document.removeEventListener("click", this.hide)
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Dropdown
	 */
    render() {
        const renderListItems = () => {
            const items = []
            for (let i = 0; i < this.props.list.length; i++) {
                const item = this.props.list[i]
                items.push(
                    <div key={`dropdown-item-${i}`} className={"dropdown--list-item" + (this.state.selected === item ? " selected" : "")} onClick={this.select.bind(null, item)} onKeyDown={() => { }} tabIndex={0} role="button">
                        <span>{item.name}</span>
                    </div>
                )
            }
            return items
        }

        return <div className={"dropdown" + (this.state.listVisible ? " show" : "")}>
            <div className={"dropdown--button" + (this.state.listVisible ? " clicked" : "")} onClick={this.show} onKeyDown={() => { }} tabIndex={0} role="button">
                <span>{this.state.selected.name}</span>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="dropdown--list">
                <div className="dropdown--list-wrapper">
                    {renderListItems()}
                </div>
            </div>
        </div >
    }
}