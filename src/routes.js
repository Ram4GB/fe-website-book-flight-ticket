import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import UnderConstruction from './common/components/UnderConstruction'

export class routes extends Component {
  render () {
    return (
      <>
        <Route path='/dashboard' exact component={UnderConstruction} />
        <Route path='/user' exact component={UserPage} />
      </>
    )
  }
}

export default routes
