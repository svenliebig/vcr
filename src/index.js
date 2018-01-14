import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import Dialog from "@components/dialog"
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css';

ReactDOM.render(<Router />, document.getElementById('root'));
ReactDOM.render(<Dialog title="Einstellungen" />, document.getElementById('dialogs'));
registerServiceWorker();