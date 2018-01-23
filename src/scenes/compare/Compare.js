import React, { Component } from 'react'
import Skeleton from '@scenes/skeleton'
import SeriesapiService from '@service/api/Moviedb'
import SeriesCard from '@components/SeriesCard'
import UserRepository from "@service/user/UserRepository";

import './Compare.css';
import EventBus from '@service/EventBus/EventBus';

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
		this.sapi = new SeriesapiService()
		self = this

		EventBus.instance.emit("getUsers").then(users => this.setState({ users }))
		EventBus.instance.emit("getAllSeries").then(yours => this.setState({ yours }))
		this.addSeries = this.addSeries.bind(this)
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

	addSeries(id) {
		let self = this
		this.sapi.getCompleteSeries(id, (series) => {
			let yours = self.state.yours.slice()
			yours.push(series)
			self.ur.addSeries(series)
			self.setState({ yours }, () => {
				self.handler(self.state.other)
			})
		})
	}

	render() {
		const renderBoth = () => {
			return (
				<div>
					<div className="header">{this.state.other.name} {"&"} du:</div>
					<div className="content">
						{this.state.both.map(val => <SeriesCard key={val.name} series={val} />)}
					</div>
				</div>
			)
		}
		const renderYou = () => {
			return (
				<div>
					<div className="header">Du:</div>
					<div className="content">
						{this.state.onlyyou.map(val => <SeriesCard key={val.name} series={val} />)}
					</div>
				</div>
			)
		}
		const renderHim = () => {
			const actions = (id) => {
				if (this.state.processing) {
					return
				}
				return (<button onClick={this.addSeries.bind(this, id)}><span className="fa fa-plus"></span></button>);
			}

			return (
				<div>
					<div className="header">{this.state.other.name}:</div>
					<div className="content">
						{this.state.onlyhim.map(val =>
							<SeriesCard key={val.name} series={val}>
								<div className="actions">{actions(val.id)}</div>
							</SeriesCard>
						)}
					</div>
				</div>
			)
		}
		return (
			<Skeleton>
				<div className="table">
					<div className="header">
						{this.state.users.filter(val => val.name).map((val, i) => <div className="user" key={i} onClick={this.handler.bind(this, val)}>{val.name}</div>)}
					</div>
					<div className="content">
					</div>
					{(this.state.both.length !== 0) && renderBoth()}
					{(this.state.onlyyou.length !== 0) && renderYou()}
					{(this.state.onlyhim.length !== 0) && renderHim()}
				</div>
			</Skeleton>
		)
	}
}
