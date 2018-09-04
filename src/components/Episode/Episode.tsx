import React, { Component } from "react"
import Tooltip from "@components/Tooltip"
import EpisodeModel from "vcr-shared/models/EpisodeModel"
import "./Episode.less"
import TimeUtil from "@service/TimeUtil"

export interface Props {
    episode: EpisodeModel
    onClick?(): void
}

/**
 * Component Class of Episode.
 *
 * @export
 * @class Episode
 * @extends {Component}
 */
export default class Episode extends Component<Props> {
    get aired() {
        return this.props.episode.isNotAired()
    }

    get tooltip() {
        if (this.aired) {
            return `S${this.season}E${this.episode} kommt am ` + this.airDate
        } else {
            return `S${this.season}E${this.episode} - ${this.props.episode.name} vom ${this.airDate}`
        }
    }

    get airDate() {
        return TimeUtil.formatDateString(this.props.episode.airDate)
    }

    get season() {
        if (parseInt(this.props.episode.season as any, 10) > 9) {
            return this.props.episode.season
        } else {
            return `0${this.props.episode.season}`
        }
    }

    get episode() {
        if (parseInt(this.props.episode.episode as any, 10) > 9) {
            return this.props.episode.episode
        } else {
            return `0${this.props.episode.episode}`
        }
    }

    get icon() {
        return this.aired ? ("fa fa-clock-o") : (this.props.episode.watched ? "fa fa-check-square-o" : "fa fa-square-o")
    }

    /**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Episode
	 */
    render() {
        return (
            <div className="episode-container">
                <Tooltip text={this.tooltip}>
                    <button
                        className={this.icon}
                        onClick={this.props.onClick}>
                    </button>
                </Tooltip>
            </div>
        )
    }
}