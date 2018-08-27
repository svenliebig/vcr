import prod from "./prod.environment"
import * as test from "./test.environment"
import * as devel from "./development.environment"

type EnvironmentType = {
    production: boolean,
    firebase: {
        apiKey: string,
        authDomain: string,
        databaseURL: string,
        projectId: string,
        storageBucket: string
        messagingSenderId: string
    },
    themoviedb: string,
    websocketurl: string
}

let environment: EnvironmentType

if (process.env.NODE_ENV === "test") {
    environment = test.default
} else if (process.env.NODE_ENV === "production") {
    environment = prod
} else {
    environment = devel.default
}

export default environment