/** React Imports */
import View from "@scenes/view/View"
import React, { Component, ComponentType } from "react"
/** Router */
import { BrowserRouter, Route, Switch } from "react-router-dom"
/** Services */
import Firebase from "./service/firebase/Firebase"
import Board from "@scenes/board/Board"
import Statistic from "@scenes/statistic/Statistic"
import Manage from "@scenes/manage/Manage"
import Compare from "@scenes/compare/Compare"
import Login from "@scenes/login/Login"

const firebase = new Firebase()

/**
 *
 *
 * @export
 * @class Router
 * @extends {Component}
  */
export default class Router extends Component {
    render() {
        let routesArray: Array<{ path: string, component: ComponentType<any>, key: string }> = []

        if (firebase.isLoggedIn()) {
            routesArray = [
                { path: "/", component: Board, key: "1" },
                { path: "/manage", component: Manage, key: "2" },
                { path: "/view/:id", component: View, key: "3" },
                { path: "/statistics", component: Statistic, key: "4" },
                { path: "/compare/:username", component: Compare, key: "5" }
            ]
            // ReactDOM.render(<Chat />, document.getElementById("chat"))
        } else {
            routesArray.push({ path: "/", component: Login, key: "1" })
        }

        return (
            <BrowserRouter>
                <Switch>
                    {routesArray.map((route) => <Route exact {...route} />)}
                </Switch>
            </BrowserRouter>
        )
    }
}