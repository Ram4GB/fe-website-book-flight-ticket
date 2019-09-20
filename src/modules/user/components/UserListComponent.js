import React, { Component } from 'react'

export class UserComponent extends Component {
  componentDidMount () {
    console.log(this.props)
    this.props.getData()
  }

  render () {
    return <div style={{ textAlign: 'center' }}>User Page</div>
  }
}

export default UserComponent
