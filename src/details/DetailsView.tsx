import React, { Component } from "react"
import SeriesModel from "vcr-shared/models/SeriesModel"
import { RouteComponentProps } from "react-router-dom"

import "./Details.less"
import TimeUtil from "@service/TimeUtil"

export interface OwnProps extends RouteComponentProps<{ id: number }> {
    children?: React.ReactNode
}

export interface StateProps {
    series: SeriesModel | null
}

export interface DispatchProps {
    loadSeries(id: number): void
}

export type Props = OwnProps & DispatchProps & StateProps

export default class DetailsView extends Component<Props, {}> {
    constructor(props: Props) {
        super(props)

        this.state = {
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
        return <div className="row details-header">
            <div className="backdrop-wrapper">
                <SeriesImage size={SeriesImageSizes.LargeFaceBackdrop} asBackground={true} imagePath={series.backdropUrl} />
            </div>
            <div className="container">
                <div className="row align-items-lg-center align-items-baseline">
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