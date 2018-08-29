import React, { Component } from "react"
import Header from "./header/Header"

export interface Props {
    children: React.ReactNode
    dontRenderHeader?: boolean
}

/**
 *
 *
 * @export
 * @class Skeleton
 * @extends {Component}
 */
export default class Skeleton extends Component<Props> {
    render() {
        return <>
            {this.props.dontRenderHeader ? "" : <Header />}
            <main className="content" style={{ padding: "30px", marginTop: "50px" }}>
                {this.props.children}
            </main>
        </>
    }
}