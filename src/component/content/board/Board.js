import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Series from '@component/content/board/series/Series';
import UserRepository from '@service/user/UserRepository';

export default class Board extends Component {
  constructor() {
		super();
		this.ur = UserRepository;

		this.state = {
			userSeries: []
		}
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
			})
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
				{ seriesMap }
			</Skeleton>
		)
  }
}
