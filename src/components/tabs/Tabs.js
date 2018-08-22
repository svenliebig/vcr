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
            <div className={ `tabs ${this.props.className}` }>
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
Tabs.propTypes = {
    defaultActiveTabIndex: PropTypes.number,
    className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element
	]).isRequired
}

export class Tab extends Component {
	render() {
        return (
            <li className={ `tab ${this.props.className}` }>
                <button className={`tab-link ${this.props.isActive ? 'active' : ''}`}
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.onClick(this.props.tabIndex);
					}}
				>
                    <i className={`tab-icon ${this.props.icon}`}/>
                    <div>{ this.props.title }</div>
                </button>
            </li>
        )
    }
}

Tab.propTypes = {
	icon: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    isActive: PropTypes.bool,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func
}