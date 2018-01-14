import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import Preferences from "@scenes/skeleton/header/nav/preferences"
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css';

ReactDOM.render(<Router />, document.getElementById('root'));
ReactDOM.render(<Preferences />, document.getElementById('dialogs'));
registerServiceWorker();