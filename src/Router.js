/** React Imports */
import * as React from 'react';

/** Components */
import App from './component/App';

/** Router */
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const routesArray = [
	{ path: '/', component: App, key: '1' }
];

/**
 * Iterate through the routesArray and generate a Route Element for
 * each entry of {@link RouteInterface}.
 */
const routesElements = routesArray.map((route) =>
	<Route exact key={ route.key } path={ route.path } component={ route.component } /> 
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			{ routesElements }
		</Switch>
	</BrowserRouter>
);

export default Routes;