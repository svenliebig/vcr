import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(
			<Dropdown onclick={ () => {}} selected={ 0 } list={ [0] } />
		, div)
	})

	// TODO Test.
});