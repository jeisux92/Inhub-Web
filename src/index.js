import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'; //

// reducers
import AuthReducer from "./store/reducers/auth";
import ClientReducer from "./store/reducers/auth";
// Import styles
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

// Custom Components
import App from "App";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  auth: AuthReducer,
  client: ClientReducer
});
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
