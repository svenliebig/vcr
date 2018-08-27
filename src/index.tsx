import React from "react"
import Router from "./Router"
import { render } from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import Preferences from "@scenes/skeleton/header/nav/preferences/Preferences"
import EventHandler from "@components/EventHandler/EventHandler"

import "font-awesome/css/font-awesome.css"

render(<EventHandler><Router /></EventHandler>, document.getElementById("root"))
render(<Preferences />, document.getElementById("dialogs"))
registerServiceWorker()