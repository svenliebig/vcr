import React, { Component, ReactNode } from "react"
import SeriesModel from "vcr-shared/models/SeriesModel"
import { RouteComponentProps, Link } from "react-router-dom"

import "./Details.less"
import TimeUtil from "@service/TimeUtil"
import SharedLinkInput from "@components/SharedLinkInput"
import SeasonModel from "vcr-shared/models/SeasonModel"
import { Routes } from "../Router"
import SuggestionWidget from "@scenes/view/SuggestionWidget"
import { EpisodeModel } from "vcr-shared"
import SeasonTable from "@details/SeasonTable"
import { SeriesLinkTypes } from "vcr-shared/models/SeriesLinkModel"

export interface OwnProps extends RouteComponentProps<{ id: number }> {
    children?: React.ReactNode
}

export interface StateProps {
    series: SeriesModel | null,
    selectedSeason: number
}

export interface DispatchProps {
    loadSeries(id: number): void
    changeSeason(seasonNumber: number): void
    toggleEpisode(episode: EpisodeModel): void
    toggleSeason(season: SeasonModel): void
    delete(series: SeriesModel): void
}

export type Props = OwnProps & DispatchProps & StateProps

export interface State {
    selectedSeason: number
}

export default class DetailsView extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            selectedSeason: 0
        }

        props.loadSeries(props.match.params.id)
    }

    public render() {
        if (this.props.series) {
            return this.renderSeries(this.props.series)
        } else {
            return <div className="progress" />
        }
    }

    private renderSeries(series: SeriesModel) {
        const { selectedSeason, changeSeason } = this.props
        return <>
            <div className="row details-header" style={{ backgroundImage: `url(${ImageUrlService.createBackdrop(series, SeriesImageSizes.LargeFaceBackdrop)})` }}>
                <div className="container">
                    <div className="row align-items-lg-center align-items-baseline">
                        <div className="col col-12 d-flex justify-content-between mt-1">
                            <Link to={Routes.Board}>Zurück</Link>
                            <Link to={Routes.Board}>Delete</Link>
                        </div>
                        <div className="col d-none d-lg-flex col-4">
                            <SeriesImage size={SeriesImageSizes.Width300} imagePath={series.posterUrl} />
                        </div>
                        <div className="col col-lg-8 col-12">
                            <h2>{series.name} ({TimeUtil.getYear(series.airDate)})</h2>
                            <section>
                                <h3 className="sr-only">Genres</h3>
                                {series.genres.map(g => <small key={g} className="genre-badge">{g}</small>)}
                            </section>
                            <section>
                                <h3>Beschreibung</h3>
                                <p>{series.overview}</p>
                            </section>
                            <section>
                                <h3>Bewertung</h3>
                                <p>{series.rating} aus {series.votes} Bewertungen</p>
                            </section>
                            <section>
                                <h3>Status</h3>
                                <p>{series.status}</p>
                            </section>
                            <section>
                                <h3>Links</h3>
                                <ul>
                                    <li>
                                        <a target="_blank" href={`https://www.themoviedb.org/tv/${series.id}`}>TheMoviedb</a>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-lg-4 order-0">
                        <section>
                            <h2>Links</h2>
                            {Object.keys(SeriesLinkTypes).map((type: any) => <SharedLinkInput type={SeriesLinkTypes[type]} />)}
                        </section>
                        <section>
                            <h2>Teilen</h2>
                            <SuggestionWidget seriesId={series.id} />
                        </section>
                    </div>
                    <section className="col col-12 col-lg-8 order-2 order-lg-1">
                        <h2>Staffeln</h2>
                        {series.seasons.map(season => <button
                            key={season.seasonNumber}
                            className={`season${selectedSeason === season.seasonNumber - 1 ? " active" : ""}`}
                            onClick={changeSeason.bind(this, season.seasonNumber - 1)}
                        >
                            {season.seasonNumber}
                        </button>)}
                        {this.renderSelectedSeason(series.seasons[selectedSeason])}
                    </section>
                </div>
            </div>
        </>
    }

    private renderSelectedSeason(season: SeasonModel): ReactNode {
        const { toggleEpisode, toggleSeason } = this.props
        if (season && Array.isArray(season.episodes)) {
            return <SeasonTable season={season} toggleSeason={toggleSeason} toggleEpisode={toggleEpisode} />
        }
        return null
    }
}

export enum SeriesImageSizes {
    Original = "original",
    Width300 = "w300",
    Width500 = "w500",
    Height300 = "h300",
    LargeFaceBackdrop = "w1400_and_h450_face"
}

export interface SeriesImageProps {
    size: SeriesImageSizes
    imagePath: string
    type?: "backdrop" | "poster"
    asBackground?: boolean
}

export class SeriesImage extends Component<SeriesImageProps> {
    public static BASE_URL = "https://image.tmdb.org/t/p/"

    public render() {
        if (this.props.asBackground) {
            return <div style={{
                backgroundImage: `url(${this.imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%",
                width: "100%",
            }}>
                <div className="overlay" />
            </div>
        }
        return <img src={this.imageUrl} />
    }

    private get imageUrl(): string {
        return `${SeriesImage.BASE_URL}${this.props.size}${this.props.imagePath}`
    }
}

export class ImageUrlService {
    public static createBackdrop(series: SeriesModel, size?: SeriesImageSizes) {
        return `${SeriesImage.BASE_URL}${size}${series.backdropUrl}`
    }
}