import React, { Component } from "react"
import Nav from "./nav/Nav"
import Options from "./options/Options"
import getQuote from "@service/api/Quotes"
import "./Header.less"

export default class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="quote">
                    {getQuote()}
                </div>
                <Nav />
                <Options />
            </div>
        )
    }
}