import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import InputText from './InputText'

describe('InputText', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<InputText id='input' />, div)
	})

	describe('✈ initial', () => {
	})

	describe('📽 render', () => {
	})
	
	describe('⚙ actions', () => {
	})
})