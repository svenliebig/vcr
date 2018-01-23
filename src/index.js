import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import Preferences from "@scenes/skeleton/header/nav/preferences"
import registerServiceWorker from './registerServiceWorker'
import EventHandler from '@components/EventHandler/EventHandler'

import 'font-awesome/css/font-awesome.css'

ReactDOM.render(<EventHandler><Router /></EventHandler>, document.getElementById('root'))
ReactDOM.render(<Preferences />, document.getElementById('dialogs'))
registerServiceWorker()