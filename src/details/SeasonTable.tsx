import React, { Component } from "react"
import { SeasonModel, EpisodeModel } from "vcr-shared"
import TimeUtil from "@service/TimeUtil"

export interface OwnProps {
    children?: React.ReactNode
}

export interface StateProps {
    season: SeasonModel
}

export interface DispatchProps {
    toggleEpisode(episode: EpisodeModel): void
    toggleSeason(season: SeasonModel): void
}

export type Props = OwnProps & DispatchProps & StateProps

export default class SeasonTable extends Component<Props> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { season, toggleEpisode, toggleSeason } = this.props
        return <table className="details-series-table">
            <thead>
                <tr>
                    <th colSpan={4}>
                        <button onClick={() => toggleSeason(season)}>Toggle Staffel {season.seasonNumber}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {season.episodes.map(episode => <tr key={episode.episode}>
                    <td>
                        <input type="checkbox" checked={episode.watched} onChange={(() => toggleEpisode(episode))} />
                    </td>
                    <td>{episode.episode}</td>
                    <td>{episode.name}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{TimeUtil.formatDateString(episode.airDate)}</td>
                </tr>)}
            </tbody>
        </table>
    }
}