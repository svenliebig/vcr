import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './Tabs.css'

/**
 * Component Class of Tabs.
 * 
 * @export
 * @class Tabs
 * @extends {Component}
 */
export class Tabs extends Component {

	/**
	 * Creates an instance of Tabs.
	 * @memberof Tabs
	 */
	constructor(props) {
		super(props);
		
		this.state = {
			activeTabIndex: this.props.defaultActiveTabIndex			
		};

        this.handleTabClick = this.handleTabClick.bind(this);
	}

	handleTabClick(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

	renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            });
        });
    }
	
    // Render current active tab content
    renderActiveTabContent() {
        const { children } = this.props;
        const { activeTabIndex } = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

	/**
	 * Renders the Component.
	 * 
	 * @returns 
	 * @memberof Tabs
	 */
	render() {
		return (
            <div className="tabs">
                <ul className="tabs-nav nav navbar-nav navbar-left">
                    { this.renderChildrenWithTabsApiAsProps() }
                </ul>
                <div className="tabs-active-content">
                    { this.renderActiveTabContent() }
                </div>
            </div>
		);
	}
}

/** The Prop Types */
// Tabs.propTypes = {
// 	selected: PropTypes.number.isRequired,
// 	children: PropTypes.oneOfType([
// 		PropTypes.array,
// 		PropTypes.element
// 	]).isRequired
// }

export const Tab = (props) => {
    return (
        <li className="tab">
            <a className={`tab-link ${props.isActive ? 'active' : ''}`}
                onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                <i className={`tab-icon ${props.icon}`}/>
				<div>{ props.title }</div>
            </a>
        </li>
    )
}

Tab.propTypes = {
	icon: PropTypes.string,
	title: PropTypes.string
}