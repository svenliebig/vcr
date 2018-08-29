import prod from "./prod.environment"
import test from "./test.environment"
import devel from "./development.environment"

export type EnvironmentType = {
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
    environment = test
} else if (process.env.NODE_ENV === "production") {
    environment = prod
} else {
    environment = devel
}

export default environment