import SearchResult from "@scenes/manage/searchresult/SearchResult"
import Skeleton from "@scenes/skeleton/Skeleton"
import { SeriesByNameSeriesResponse } from "@service/api/Moviedb"
import EventBus from "@service/EventBus/EventBus"
import React, { ChangeEvent, Component } from "react"
import "rxjs/add/operator/debounceTime"
import { Subject } from "rxjs/Subject"
import "./Manage.less"

export interface State {
    searchString: string
    searchResultsArray: Array<SeriesByNameSeriesResponse>
}

export default class Manage extends Component<{}, State> {
    private observer: Subject<{}>
    private searchInput = React.createRef<HTMLInputElement>()

    constructor(props: {}) {
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
            EventBus.instance.emit("findSeriesByName", this.state.searchString).then((result: Array<SeriesByNameSeriesResponse>) => {
                this.setState({
                    searchResultsArray: result
                })
            })
        })

        this.searchStringChanged = this.searchStringChanged.bind(this)
    }

    componentDidMount() {
        this.searchInput.current!.focus()
    }

    render() {
        const searchResults = this.state.searchResultsArray.map((series) =>
            <div key={series.id}>
                <SearchResult series={series} />
            </div>
        )

        return (
            <Skeleton>
                <div className="manage-wrapper">
                    <input ref={this.searchInput} placeholder="Suche. ." type="text" onChange={this.searchStringChanged} value={this.state.searchString} />
                </div>
                {searchResults}
            </Skeleton>
        )
    }

    private searchStringChanged(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchString: event.target.value
        })
        this.observer.next(event.target.value)
    }
}
