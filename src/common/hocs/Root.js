import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MainPage from './MainPage'

export default class Root extends Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <MainPage
          store={store}
          history={history}
        />
      </Provider>
    )
  }
}
