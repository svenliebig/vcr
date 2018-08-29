import React, { Component } from "react"
import EventBus from "@service/EventBus/EventBus"
import Skeleton from "@scenes/skeleton/Skeleton"

import "./Statistic.less"
import SeriesModel from "@model/SeriesModel"

export interface State {
    totalTime: number
    noduration: Array<SeriesModel>
}

/**
 * Component Class of Statistic.
 *
 * @export
 * @class Statistic
 * @extends {Component}
 */
export default class Statistic extends Component<{}, State> {
    public state: State = {
        totalTime: 0,
        noduration: []
    }

    componentWillMount() {
        EventBus.instance.emit("getAllSeries").then((val: Array<SeriesModel>) => this.calcSeries(val))
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Statistic
	 */
    render() {
        const { totalTime } = this.state as { totalTime: any }
        return (
            <Skeleton>
                <div>Gesamtzeit: {parseInt(totalTime, 10)} Minuten</div><br />
                Das sind: <br />
                {parseInt(totalTime / 60 + "", 10)} Stunden, oder<br />
                {parseFloat(totalTime / 60 / 24 + "").toFixed(2)} Tage, oder<br />
                {parseFloat(totalTime / 60 / 24 / 30 + "").toFixed(2)} Monate, oder<br />
                {parseFloat(totalTime / 60 / 24 / 30 / 12 + "").toFixed(2)} Jahre<br />
                {(this.state.noduration.length !== 0 ? <div>Diese Serien haben keine Episodenlänge in der Datenbank hinterlegt und können deswegen nicht berücksichtigt werden:</div> : "")}
                {
                    this.state.noduration.map(val => {
                        return <a key={val.id} href={`https://www.themoviedb.org/tv/${val.id}`} target="_blank">{val.name}</a>
                    })
                }
                {(this.state.noduration.length !== 0 ? <div>Wenn du sie dort updatest und dann neu lädst wird es funktionieren.</div> : "")}
            </Skeleton>
        )
    }

    private calcSeries(seriesArray: Array<SeriesModel>) {
        let tempTotalDuration = 0
        const tempNoDuration: Array<SeriesModel> = []

        seriesArray.forEach(series => {
            let durationAverage = 0

            if (!series.episodeDuration) {
                tempNoDuration.push(series)
                return
            }
            series.episodeDuration.forEach(singleDuration => {
                durationAverage += singleDuration
            })

            durationAverage /= series.episodeDuration.length

            if (!series.seasons) {
                return
            }

            series.seasons.forEach(season => {
                if (!season.episodes) {
                    return
                }

                season.episodes.forEach((episode) => {
                    if (episode.watched) {
                        tempTotalDuration += durationAverage
                    }
                })
            })
        })

        this.setState({
            totalTime: tempTotalDuration,
            noduration: tempNoDuration
        })
    }
}