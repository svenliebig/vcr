import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import SearchResult from '@component/content/manage/searchresult/SearchResult';
import SeriesapiService from '@service/api/Moviedb';

import './Manage.css';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

export default class Manage extends Component {
	constructor() {
		super();

		let tvapi = new SeriesapiService();

		this.state = {
			searchString: '',
			searchStringObs: new Subject(),
			searchResultsArray: []
		}

		let self = this;
		this.state.searchStringObs.debounceTime(500).subscribe(
			() => {
				if (self.state.searchString === '') {
					self.setState({
						searchResultsArray: []
					});
					return;
				}
				tvapi.findSerieByName(self.state.searchString, (result) => {
					self.setState({
						searchResultsArray: result
					});
				});
			}
		);

		this.searchStringChanged = this.searchStringChanged.bind(this);
	}

	searchStringChanged(event) {
		this.setState({
			searchString: event.target.value
	  	});
		this.state.searchStringObs.next(event.target.value);
	}

	clearInput() {
		this.searchString = '';
		this.searchStringObs.next(this.searchString);
	}

	render() {
		const searchResults = this.state.searchResultsArray.map((series) =>
			<div key={ series.id }>
				<SearchResult series={ series } />
			</div> 
		);

		return (
		<Skeleton>
			<div className="manage-wrapper">
				<input placeholder="Suche. ." type="text" onChange={ this.searchStringChanged } value={ this.state.searchString} />
			</div>
			{ searchResults }
		</Skeleton>
		)
	}
}
