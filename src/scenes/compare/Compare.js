import React, { Component } from 'react'
import Skeleton from '@scenes/skeleton'
import UserRepository from '@service/user'
import SeriesCard from '@components/SeriesCard'

import './Compare.css';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG, SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

export default class Compare extends Component {

	constructor(props) {
		super(props)

		this.state = {
			yours: [],
			users: [],
			other: {},
			both: [],
			onlyhim: [],
			onlyyou: []
		}

		this.ur = new UserRepository()
		self = this

		this.ur.getUserKeys().then(users => self.setState({ users }))
		this.ur.getAllSeries().then(yours => self.setState({ yours }))
	}

	handler(other) {
		let otherSeries = other.series.slice()
		const yourSeries = this.state.yours

		const both = []
		const onlyhim = []
		const onlyyou = []

		yourSeries.forEach(series => {
			const index = otherSeries.findIndex(val => val.id === series.id);

			if (index !== -1) {
				both.push(series)
				otherSeries.splice(index, 1)
			} else {
				onlyyou.push(series)
			}
		})

		otherSeries.forEach(series => onlyhim.push(series))

		this.setState({
			both,
			onlyyou,
			onlyhim,
			other
		})
	}

	render() {
		const renderBoth = () => {
			return (
				<div>
					<div className="header">{this.state.other.name} {"&"} du:</div>
					<div className="content">
					{ this.state.both.map(val => <SeriesCard key={ val.name } series={ val } />) }
					</div>
				</div>
			)
		}
		const renderYou = () => {
			return (
				<div>
					<div className="header">Du:</div>
					<div className="content">
					{ this.state.onlyyou.map(val => <SeriesCard key={ val.name } series={ val } />) }
					</div>
				</div>
			)
		}
		const renderHim = () => {
			return (
				<div>
					<div className="header">{this.state.other.name}:</div>
					<div className="content">
					{ this.state.onlyhim.map(val => <SeriesCard key={ val.name } series={ val } />) }
					</div>
				</div>
			)
		}
		return (
			<Skeleton>
				<div className="table">
					<div className="header">
						{ this.state.users.filter(val => val.name).map((val, i) => <div className="user" key={ i } onClick={this.handler.bind(this, val)}>{val.name}</div>) }
					</div>
					<div className="content">
					</div>
					{ (this.state.both.length !== 0) && renderBoth() }
					{ (this.state.onlyyou.length !== 0) && renderYou() }
					{ (this.state.onlyhim.length !== 0) && renderHim() }
				</div>
			</Skeleton>
		)
	}
}
