import InputText from "@components/Input/Text/InputText"
import { Tab, Tabs } from "@components/tabs/Tabs"
import Firebase from "@service/firebase/Firebase"
import React, { Component, FormEvent } from "react"
import { RouteComponentProps } from "react-router-dom"
import "./Login.less"

export interface State {
    email: string
    password: string
    error?: string
}

export type Props = RouteComponentProps<{}>

/**
 * Login View.
 */
class Login extends Component<Props, State> {
    private firebase: Firebase = new Firebase()

    constructor(props: Props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: undefined
        }

        this.submitLogin = this.submitLogin.bind(this)
        this.submitRegistration = this.submitRegistration.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleAction = this.handleAction.bind(this)
    }

    submitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { email, password } = this.state
        this.firebase.login(email, password).then(() => this.handleAction())
    }

    submitRegistration(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        this.firebase.createUser(this.state.email, this.state.password).then(() => this.handleAction())
    }

    handleAction() {
        const error = this.firebase.getError()
        if (error) {
            this.setState(() => ({ error }))
        } else {
            window.location.pathname = "/"
        }
        this.firebase.clearError()
    }

    handleInputChange(value: string, id: string) {
        (this as any).setState({ [id]: value })
    }

    render() {
        return <div className="login-wrapper">
            <div className="login-wrapper--container">
                <Tabs defaultActiveTabIndex={0} className="login-wrapper--tabs">
                    <Tab title="Login" className="login-wrapper--tab">
                        <form onSubmit={this.submitLogin} className="login-wrapper--form" >
                            <div className="input">
                                <p className="input-title">
                                    VCR
                                        </p>

                                <InputText id="email" label="E-Mail" onChange={this.handleInputChange} value={this.state.email} placeholder="E-Mail" />
                                <InputText id="password" label="Password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" type="password" />

                                <div className="input-text--wrapper">
                                    <input
                                        className="input-area--button"
                                        type="submit"
                                        value="Login"
                                    />
                                </div>
                            </div>
                        </form>
                    </Tab>
                    <Tab title="Registrieren">
                        <form onSubmit={this.submitRegistration} className="login-wrapper--form" >
                            <div className="input">
                                <p className="input-title">VCR</p>
                                <InputText id="email" label="E-Mail" onChange={this.handleInputChange} value={this.state.email} placeholder="E-Mail" />
                                <InputText id="password" label="Password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" type="password" />

                                <div className="input-text--wrapper">
                                    <input
                                        className="input-area--button"
                                        type="submit"
                                        value="Registrieren"
                                    />
                                </div>
                            </div>
                        </form>
                    </Tab>
                </Tabs>
            </div>
            {!!this.state.error ? <p className="input-area--login-error">{this.state.error}</p> : null}
        </div>
    }
}

export default Login