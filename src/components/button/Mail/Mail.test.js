import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Mail from './Mail'

describe('Mail', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Mail onClick={() => { }} />, div)
	})

	describe('⚙ actions', () => {
		it('should call the onClick function after the click', (done) => {
			const html = shallow(<Mail onClick={done} />)
			html.find('button').simulate('click')
		});
	})
})