import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import ButtonRemove from './ButtonRemove'

describe('ButtonRemove', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<ButtonRemove onClick={ () =>  {} } />, div)
	})

	describe('✈️  initial', () => {
	})

	describe('📽  render', () => {
	})
	
	describe('⚙ actions', () => {
		it('should call the onClick function after the click', (done) => {
			const html = shallow(<ButtonRemove onClick={ done } />)
			html.find('button').simulate('click')
		});
	})
})