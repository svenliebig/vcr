/** React Imports */
import React, { Component } from 'react'
import ReactDOM from "react-dom"

/** Components */
import Login from '@scenes/login/Login'
import Manage from '@scenes/manage/Manage'
import Board from '@scenes/board/Board'
import View from '@scenes/view/View'
import Statistic from '@scenes/statistic/Statistic'
import Compare from '@scenes/compare'
import Chat from "@components/Chat"

/** Router */
import { BrowserRouter, Route, Switch } from 'react-router-dom'

/** Services */
import Firebase from './service/firebase/Firebase';

const fb = new Firebase();

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
		if (fb.isLoggedIn()) {
			routesArray = [
				{ path: '/', component: Board, key: '1' },
				{ path: '/manage', component: Manage, key: '2' },
				{ path: '/view/:id', component: View, key: '3' },
				{ path: '/statistics', component: Statistic, key: '4' },
				{ path: '/compare/:username', component: Compare, key: '5' }
			];
			ReactDOM.render(<Chat />, document.getElementById("chat"))
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
			<Route exact key={route.key} path={route.path} component={route.component} />
		);

		return (
			<BrowserRouter>
				<Switch>
					{routesElements}
				</Switch>
			</BrowserRouter>
		)
	}
}