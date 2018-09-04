import thunk from "redux-thunk"
import { createStore, applyMiddleware, compose } from "redux"
import RootReducer from "./RootReducer"

const middleware = applyMiddleware(thunk) as any
const devTools = (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f

const Store = createStore(
    RootReducer,
    compose(middleware, devTools),
)

export default Store