import React from "react"
import { Provider } from "react-redux"
import Store from "./Store"
import "font-awesome/css/font-awesome.css"
import * as Sentry from "@sentry/browser"
import SentryCatcher from "@components/SentryCatcher"

Sentry.init({ dsn: "https://418b27b35ee04b559821c0de95bb5dad@sentry.io/1292368" });

(async function () {
    const E = (await import("@components/EventHandler/EventHandler")).default
    const P = (await import("@scenes/skeleton/header/nav/preferences/Preferences")).default
    const R = (await import("./Router")).default

    const { render } = (await import("react-dom"))

    render(<SentryCatcher><Provider store={Store}><E><R /></E></Provider></SentryCatcher>, document.getElementById("root"))
    render(<P />, document.getElementById("dialogs"));
    (await import("./registerServiceWorker")).default()
})()