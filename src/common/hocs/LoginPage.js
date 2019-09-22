import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

export class LoginPage extends Component {
  render () {
    return (
      <>
        <div
          style={{
            width: '300px',
            margin: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        >
          <LoginForm />
        </div>
      </>
    )
  }
}

export default LoginPage
