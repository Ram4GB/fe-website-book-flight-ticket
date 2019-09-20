import React, { Component } from 'react'
import MainLayout from './common/hocs/MainLayout'
import { BrowserRouter, Switch } from 'react-router-dom'
import Routes from './routes'

export class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Routes />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    )
  }
}

export default App
