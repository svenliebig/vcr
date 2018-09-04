import SeriesCard from "@components/SeriesCard/SeriesCard"
import EventBus from "@service/EventBus/EventBus"
import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import SeriesConverter from "vcr-shared/converter/SeriesConverter"
import SeriesModel from "vcr-shared/models/SeriesModel"
import { UserRepositoryResponse } from "vcr-shared/service/UserRepository"
import "./Compare.less"
import { SeriesFirebase } from "vcr-shared/service/FirebaseTypes"

export interface State {
    yours: Array<SeriesFirebase>
    other: UserRepositoryResponse | null
    both: Array<SeriesFirebase>
    onlyhim: Array<SeriesFirebase>
    onlyyou: Array<SeriesFirebase>
    processing: boolean
}

export type Props = RouteComponentProps<{ username: string }>

export default class Compare extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            yours: [],
            other: null,
            both: [],
            onlyhim: [],
            onlyyou: [],
            processing: false
        }

        if (props.match.params.username) {

            EventBus.instance.emit("getUserByName", props.match.params.username).then((other: Array<UserRepositoryResponse>) => this.handler(other))
            EventBus.instance.emit("getAllSeries").then((yours: Array<SeriesFirebase>) => this.setState({ yours }))

        } else {
            console.debug("no username provided")
        }
    }

    render() {
        return <div className="table">
            {/* <div className="content" /> */}
            {this.state.both.length !== 0 && this.renderBoth()}
            {this.state.onlyyou.length !== 0 && this.renderYou()}
            {this.state.onlyhim.length !== 0 && this.renderHim()}
        </div>
    }

    private renderBoth() {
        return <Fragment>
            <div className="header">{this.state.other!.name} {"&"} du:</div>
            <div className="content">
                {this.state.both.map(val => <SeriesCard key={val.name} series={SeriesConverter.firebaseToModel(val)} />)}
            </div>
        </Fragment>
    }

    private renderYou() {
        return <Fragment>
            <div className="header">Du:</div>
            <div className="content">
                {this.state.onlyyou.map(val => <SeriesCard key={val.name} series={SeriesConverter.firebaseToModel(val)} />)}
            </div>
        </Fragment>
    }

    private renderHim() {
        const actions = (id: number) => {
            if (this.state.processing) {
                return
            }

            return <button onClick={this.addSeries.bind(this, id)}><span className="fa fa-plus"></span></button>
        }

        return <>
            <div className="header">{this.state.other!.name}:</div>
            <div className="content">
                {this.state.onlyhim.map(val =>
                    <SeriesCard key={val.name} series={SeriesConverter.firebaseToModel(val)}>
                        <div className="actions">{actions(val.id)}</div>
                    </SeriesCard>
                )}
            </div>
        </>
    }

    private handler(other: Array<UserRepositoryResponse>) {
        if (other.length !== 1) {
            return
        }

        const otherSeries = other[0].series.slice()
        const yourSeries = this.state.yours

        const both: Array<SeriesFirebase> = []
        const onlyhim: Array<SeriesFirebase> = []
        const onlyyou: Array<SeriesFirebase> = []

        yourSeries.forEach(series => {
            const index = otherSeries.findIndex(val => val.id === series.id)

            if (index !== -1) {
                both.push(series)
                otherSeries.splice(index, 1)
            } else {
                onlyyou.push(series)
            }
        })

        otherSeries.forEach(series => onlyhim.push(series))

        this.setState({ both, onlyyou, onlyhim, other: other[0] })
    }

    private addSeries(id: number) {
        EventBus.instance.emit("addSeries", id).then((series: SeriesModel) => {
            const yours = this.state.yours.slice()
            yours.push(series)
            this.setState({ yours }, () => {
                this.handler([this.state.other!])
            })
        })
    }
}
