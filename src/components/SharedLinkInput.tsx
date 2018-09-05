import * as React from "react"

export interface Props {
    type: string
    onChange?(type: string, value: string): void
}

import "./SharedLinkInput.less"

export default class SharedLinkInput extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { type } = this.props
        return <div className="row">
            <div className="col col-12">
                <div className="shared-link">
                    <label htmlFor={`shared-link--${type}`}>
                        <img src={`/assets/${type}.jpg`} width="30" height="30" />
                    </label>
                    <input id={`shared-link--${type}`} placeholder={type} />
                    <div className={`shared-link--caption ${type}`} />
                </div>
            </div>
        </div>
    }
}