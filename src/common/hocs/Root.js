import React, { Component } from "react";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import { PersistGate } from "redux-persist/integration/react";

export default class Root extends Component {
  render() {
    const { store, history, persistor } = this.props;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainPage store={store} history={history} />
        </PersistGate>
      </Provider>
    );
  }
}
