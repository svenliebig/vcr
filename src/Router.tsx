import Chat from "@components/Chat/Chat"
import DetailsContainer from "@details/DetailsContainer"
import Board from "@scenes/board/Board"
import Compare from "@scenes/compare/Compare"
import Login from "@scenes/login/Login"
import Manage from "@scenes/manage/Manage"
import Skeleton from "@scenes/skeleton/Skeleton"
import Statistic from "@scenes/statistic/Statistic"
import ServiceFactory from "@utils/ServiceFactory"
import React, { Component, ComponentType } from "react"
import { render } from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"

export enum Routes {
    Board = "/",
}
export default class Router extends Component {
    private routesArray: Array<{ path: string, component: ComponentType<any> }> = []
    private loggedIn: boolean
    private auth = ServiceFactory.auth

    constructor(props: {}) {
        super(props)
        this.loggedIn = this.auth.isLoggedIn()
    }

    componentWillMount() {
        if (this.loggedIn) {
            this.routesArray = [
                { path: "/", component: Board },
                { path: "/manage", component: Manage },
                { path: "/details/:id", component: DetailsContainer },
                { path: "/statistics", component: Statistic },
                { path: "/compare/:username", component: Compare }
            ]
            render(<Chat />, document.getElementById("chat"))
        } else {
            this.routesArray.push({ path: "/", component: Login })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Skeleton dontRenderHeader={!this.loggedIn}>
                        {this.routesArray.map((route, i) => <Route exact {...route} key={i} />)}
                    </Skeleton>
                </Switch>
            </BrowserRouter>
        )
    }
}