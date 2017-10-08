/** React Imports */
import React, { Component } from 'react'

/** Components */
import Login from '@component/content/login/Login';
import Manage from '@component/content/manage/Manage';
import Board from '@component/content/board/Board';

/** Router */
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/** Services */
import Firebase from './service/firebase/Firebase';

/**
 * 
 * 
 * @export
 * @class Router
 * @extends {Component}
  */
export default class Router extends Component {
  render() {
	let routesArray = null;
	if(Firebase.isLoggedIn()) {
		routesArray = [
			{ path: '/', component: Board, key: '1' },
			{ path: '/manage', component: Manage, key: '1' }
		];
	} else {
		routesArray = [
			{ path: '/', component: Login, key: '1' }
		];
	}

	/**
	 * Iterate through the routesArray and generate a Route Element for
	 * each entry of {@link RouteInterface}.
	 */
	const routesElements = routesArray.map((route) =>
		<Route exact key={ route.key } path={ route.path } component={ route.component } /> 
	);

	return (
		<BrowserRouter>
			<Switch>
				{ routesElements }
			</Switch>
		</BrowserRouter>
	)
  }
}