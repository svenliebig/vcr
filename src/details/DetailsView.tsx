import * as React from "react"
import SeriesModel from "@model/SeriesModel"
import { RouteComponentProps } from "react-router-dom"

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

export default class DetailsView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }

        props.loadSeries(props.match.params.id)
    }

    render() {
        return (
            <div>Series: {this.props.series ? this.props.series.name : ""}</div>
        )
    }
}