import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MODULE_NAME as MODULE_USER } from '../modules/user/models'
import UnderConstruction from './components/UnderConstruction'
/** Pages */
import MainLayout from './hocs/MainLayout'
import LoginPage from './hocs/LoginPage'
import CashierPage from '../pages/CashierPage'
import FoodPage from '../pages/FoodPage'
export class routes extends Component {
  render () {
    const { store } = this.props
    const { user } = store.getState()[MODULE_USER]
    if (user && user.role) {
      switch (user.role) {
        case 'admin':
          return (
            <MainLayout mode='admin'>
              <Switch>
                <Route path='/dashboard' exact component={UnderConstruction} />
                <Route path='/cashier' exact component={CashierPage} />
                <Route path='/food' exact component={FoodPage} />
              </Switch>
            </MainLayout>
          )
        default:
          return (
            <MainLayout mode=''>
              <Route path='*' component={UnderConstruction} />
            </MainLayout>
          )
      }
    } else {
      return (
        <MainLayout mode=''>
          <Route component={LoginPage} path='*' />
        </MainLayout>
      )
    }
  }
}

export default routes
