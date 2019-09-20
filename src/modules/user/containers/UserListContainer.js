import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserListComponent from '../components/UserListComponent'
import handlers from '../handlers'
import { MODULE_NAME as MODULE_USER } from '../models'

export class UserContainer extends Component {
  render () {
    return <div />
  }
}

const mapStateToProps = (state, props) => {
  return {
    users: state[MODULE_USER].users
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...handlers(dispatch, props)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent)
