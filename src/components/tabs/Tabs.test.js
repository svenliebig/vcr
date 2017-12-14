import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { Tab, Tabs } from './Tabs'

describe('Tabs', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(
			<Tabs selected={ 0 }>
				<Tab tabIndex={ 0 } onClick={ () => {} }></Tab>
			</Tabs>
		, div)
	})

	// TODO Test.
});