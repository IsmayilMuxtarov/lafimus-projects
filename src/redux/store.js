import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import thunkMiddleWare from "redux-thunk";
import appReducer from './appReducer'
import countryReducer from "./countryReducer";
import loginReducer from "./loginReducer";
import videoGlaryReducer from "./videoGlaryReducer";

let reducers=combineReducers({
    app:appReducer,
    country:countryReducer,
    video:videoGlaryReducer,
    login:loginReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducers, composeEnhancers(applyMiddleware((thunkMiddleWare))))

// export default store;
window.__store=store;
export default store;
