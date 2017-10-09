import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Series from '@component/content/board/series/Series';
import UserRepository from '@service/user/UserRepository';
import SeriesRepository from '@service/series/SeriesRepository';

import './Board.css';

import moment from 'moment';

export default class Board extends Component {
  constructor() {
		super();
		this.ur = UserRepository;
		this.sr = SeriesRepository;

		this.state = {
			userSeries: [],
			deprecatedArray: []
		}

		this.checkDeprecated = this.checkDeprecated.bind(this);
	}

	checkDeprecated() {
		let self = this;
		this.state.userSeries.forEach(series => {
			self.sr.getById(series.id, (val) => {
				if(moment(series.updated).isBefore(moment(val.updated))) {
					let tempArray = self.state.deprecatedArray;
					tempArray.push(series.name);
					self.setState({
						deprecatedArray: tempArray
					})
				}
			});
		})
	}

	componentDidMount() {
		let self = this;
		this.ur.getAllSeries(series => {
			const tempArray = [];
			for(let key in series) { 
				tempArray.push(series[key]); 
			}
			self.setState({
				userSeries: tempArray
			});
			self.checkDeprecated();
		});
	}
	
  render() {

		const seriesMap = this.state.userSeries.map((series) =>
			<div key={ series.id }>
				<Series series={ series } />
			</div> 
		);

		return (
			<Skeleton>
				<div className="series-table-wrapper">
					<div className="series-table-header">
						{ 
							this.state.deprecatedArray.length > 0 ? 
							<span className='fa fa-exclamation-triangle' title={ this.state.deprecatedArray.join(' ,') }></span> : '' 
						}
					</div>
					<div className="series-table-content">
					{ seriesMap }
					</div>
				</div>
			</Skeleton>
		)
  }
}
