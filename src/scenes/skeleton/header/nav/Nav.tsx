import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Nav.less"

export default class Nav extends Component {
    render() {
        return (
            <div className="nav-wrapper">
                <div className="nav-container">
                    <ul>
                        <li><Link to="/">Board</Link></li>
                        <li><Link to="/manage">Manage</Link></li>
                        <li><Link to="/statistics">Statistics</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}