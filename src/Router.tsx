import React, { Component, ComponentType } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Firebase from "./service/firebase/Firebase"
import { render } from "react-dom"
import Chat from "@components/Chat/Chat"
import Board from "@scenes/board/Board"
import Manage from "@scenes/manage/Manage"
import Statistic from "@scenes/statistic/Statistic"
import Compare from "@scenes/compare/Compare"
import Login from "@scenes/login/Login"
import View from "@scenes/view/View"

const firebase = new Firebase()

export default class Router extends Component {
    private routesArray: Array<{ path: string, component: ComponentType<any> }> = []

    componentWillMount() {
        if (firebase.isLoggedIn()) {
            this.routesArray = [
                { path: "/", component: Board },
                { path: "/manage", component: Manage },
                { path: "/view/:id", component: View },
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
                    {this.routesArray.map((route, i) => <Route exact {...route} key={i} />)}
                </Switch>
            </BrowserRouter>
        )
    }
}