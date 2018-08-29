import React from "react"
import "font-awesome/css/font-awesome.css"

(async function () {
    const E = (await import("@components/EventHandler/EventHandler")).default
    const P = (await import("@scenes/skeleton/header/nav/preferences/Preferences")).default
    const R = (await import("./Router")).default

    const { render } = (await import("react-dom"))

    render(<E><R /></E>, document.getElementById("root"))
    render(<P />, document.getElementById("dialogs"));
    (await import("./registerServiceWorker")).default()
})()