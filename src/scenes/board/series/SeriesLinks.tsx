import React, { Component } from "react"
import SeriesLinkModel, { SeriesLinkTypes } from "vcr-shared/models/SeriesLinkModel"

export interface Props {
    links: { [T in SeriesLinkTypes]?: SeriesLinkModel }
}

export default class SeriesLinks extends Component<Props> {
    render() {
        const { links } = this.props
        const keys = Object.keys(this.props.links) as any as Array<SeriesLinkTypes>
        return <div className="link-container">
        {keys.map((v) => <a target="_blank" href={links[v]!.link}><img src={`/assets/${links[v]!.type}.jpg`} width="30" height="30" /></a>)}
        </div>
    }
}