import React, { Component } from "react"
import { Subject } from "rxjs/Subject"
import "rxjs/add/operator/debounceTime"

// Service
import EventBus from "@service/EventBus/EventBus"

// Components
import Skeleton from "@scenes/skeleton/Skeleton"
import SearchResult from "@scenes/manage/searchresult/SearchResult"

// CSS
import "./Manage.css"

export default class Manage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			searchString: "",
			searchResultsArray: []
		}

		this.observer = new Subject()

		this.observer.debounceTime(500).subscribe(() => {
			if (this.state.searchString === "") {
				this.setState({
					searchResultsArray: []
				})
				return
			}
			EventBus.instance.emit("findSeriesByName", this.state.searchString).then(result => {
				this.setState({
					searchResultsArray: result
				})
			})
		})

		this.searchStringChanged = this.searchStringChanged.bind(this);
	}

	componentDidMount() {
		this.searchInput.focus();
	}

	searchStringChanged(event) {
		this.setState({
			searchString: event.target.value
		})
		this.observer.next(event.target.value);
	}

	clearInput() {
		this.searchString = ""
		this.observer.next(this.searchString)
	}

	render() {
		const searchResults = this.state.searchResultsArray.map((series) =>
			<div key={series.id}>
				<SearchResult series={series} />
			</div>
		);

		return (
			<Skeleton>
				<div className="manage-wrapper">
					<input ref={(input) => this.searchInput = input} placeholder="Suche. ." type="text" onChange={this.searchStringChanged} value={this.state.searchString} />
				</div>
				{searchResults}
			</Skeleton>
		)
	}
}
