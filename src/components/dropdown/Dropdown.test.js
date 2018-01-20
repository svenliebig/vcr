import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'

const options = [{ 1: 1 }, { 2: 2 }]

describe('Dropdown', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(
			<Dropdown onclick={() => { }} selected={options[0]} list={[options]} />
			, div)
	})
})