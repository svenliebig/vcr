import React, { Component, ComponentType } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Firebase from "./service/firebase/Firebase"
import { render } from "react-dom"
import Chat from "@components/Chat/Chat"

const firebase = new Firebase()

export default class Router extends Component {
    async render() {
        let routesArray: Array<{ path: string, component: ComponentType<any> }> = []

        if (firebase.isLoggedIn()) {
            routesArray = [
                { path: "/", component: (await import("@scenes/board/Board")).default },
                { path: "/manage", component: (await import("@scenes/manage/Manage")).default },
                { path: "/view/:id", component: (await import("@scenes/board/Board")).default },
                { path: "/statistics", component: (await import("@scenes/statistic/Statistic")).default },
                { path: "/compare/:username", component: (await import("@scenes/compare/Compare")).default }
            ]
            render(<Chat />, document.getElementById("chat"))
        } else {
            routesArray.push({ path: "/", component: (await import("@scenes/login/Login")).default })
        }

        return (
            <BrowserRouter>
                <Switch>
                    {routesArray.map((route, i) => <Route exact {...route} key={i} />)}
                </Switch>
            </BrowserRouter>
        )
    }
}