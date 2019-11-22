import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { createHashHistory } from "history";
import rootReducer from "./modules/index";
import Root from "./common/hocs/Root";
import "antd/dist/antd.css";
import "./common/styles/grid.css";
import "./App.css";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import "./common/styles/all.css";

export const history = createHashHistory();

const config = {
  key: "qlvcb",
  storage,
  blacklist: ["session", "compiler"]
};
const createReducers = reducers => {
  return persistCombineReducers(config, {
    ...rootReducer,
    ...reducers
  });
};

const store = createStore(createReducers());
const persistor = persistStore(store);
store.reducers = createReducers();

ReactDOM.render(
  <Root persistor={persistor} store={store} history={history} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
