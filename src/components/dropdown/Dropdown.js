import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.css';

/**
 * Component Class of Dropdown.
 * 
 * @export
 * @class Dropdown
 * @extends {Component}
 */
export default class Dropdown extends Component {

	/**
	 * Creates an instance of Dropdown.
	 * @memberof Dropdown
	 */
	constructor(props) {
		super(props);
		
		this.state = {
			listVisible: false,
			selected: props.selected
		};
		
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.select = this.select.bind(this);
	}

	/**
	 * Called after the constructor.
	 * 
	 * @memberof Dropdown
	 */
	componentDidMount() {
	}

	select(item) {
		this.setState({ selected: item });
		this.props.onclick(item);
	}
	  
	show() {
		this.setState({ listVisible: true });
		document.addEventListener("click", this.hide);
	}
		  
	hide() {
		this.setState({ listVisible: false });
		document.removeEventListener("click", this.hide);
	}

	/**
	 * Renders the Component.
	 * 
	 * @returns 
	 * @memberof Dropdown
	 */
	render() {
		const renderListItems = () => {
			var items = [];
			for (var i = 0; i < this.props.list.length; i++) {
				var item = this.props.list[i];
				items.push(
					<div className={ 'dropdown--list-item' + (this.state.selected === item ? ' selected' : '') } key={ item.name } onClick={ this.select.bind(null, item) }>
						<span>{ item.name }</span>
					</div>
					);
			}
			return items;
		}

		return (
			<div className={'dropdown' + ( this.state.listVisible ? ' show' : '')}>
				<div className={'dropdown--button' + ( this.state.listVisible ? ' clicked' : '')} onClick={ this.show }>
					<span>{ this.state.selected.name }</span>
					<i className='fa fa-angle-down'></i>
				</div>
				<div className='dropdown--list'>
					<div className='dropdown--list-wrapper'>
						{ renderListItems() }
					</div>
				</div>
			</div>
		)
	}
}

Dropdown.propTypes = {
	onclick: PropTypes.func.isRequired,
	selected: PropTypes.number.isRequired,
	list: PropTypes.array.isRequired
}