import React from "react"
import Router from "./Router"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import Preferences from "@scenes/skeleton/header/nav/preferences"
import EventHandler from "@components/EventHandler/EventHandler"

import "font-awesome/css/font-awesome.css"

const test = ''
console.log(test)

ReactDOM.render(<EventHandler><Router /></EventHandler>, document.getElementById("root"))
ReactDOM.render(<Preferences />, document.getElementById("dialogs"))
registerServiceWorker()