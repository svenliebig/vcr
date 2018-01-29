import React, { Component } from 'react'

import Skeleton from '@scenes/skeleton'
import SeriesCard from '@components/SeriesCard'
import EventBus from '@service/EventBus/EventBus';

import './Compare.css';

export default class Compare extends Component {

	constructor(props) {
		super(props)

		this.state = {
			yours: [],
			other: {},
			both: [],
			onlyhim: [],
			onlyyou: []
		}

		self = this

		console.log(props.match.params.username)

		if (props.match.params.username) {

			EventBus.instance.emit("getUserByName", props.match.params.username).then(other => this.handler(other))
			EventBus.instance.emit("getAllSeries").then(yours => this.setState({ yours }))
			this.addSeries = this.addSeries.bind(this)

		} else {
			console.debug("no username provided")
		}
	}

	handler(other) {
		if (other.length !== 1) {
			return
		} else {
			other = other[0]
		}
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
		EventBus.instance.emit("addSeries", id).then(series => {
			let yours = this.state.yours.slice()
			yours.push(series)
			this.setState({ yours }, () => {
				this.handler(this.state.other)
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
