import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import ButtonToggle from './ButtonToggle'


describe('ButtonToggle', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<ButtonToggle />, div)
	})

	describe('initial states', () => {
		it('toggled should be false', () => {
			const btn = new ButtonToggle({})
			expect(btn.state.toggled).toEqual(false)
		})

		it('active icon should be fa fa-toggle-on', () => {
			const btn = new ButtonToggle({})
			expect(btn.state.activeIcon).toEqual('fa fa-toggle-on')
		})

		it('inactive icon should be fa fa-toggle-off', () => {
			const btn = new ButtonToggle({})
			expect(btn.state.inactiveIcon).toEqual('fa fa-toggle-off')
		})
	})

	describe('render', () => {
		it('should render a button', () => {
			// preparation
		
			// execution
			const html = shallow(<ButtonToggle />)
			html.find('button').simulate('click')

			expect(html.exists('.fa fa-toggle-on')).toEqual(true); 
			// testing
			// setImmediate(() => { 
			// 	done(); 
			// });
		});
	})
})