import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { connect } from 'react-redux'
import handlers from '../../modules/user/handlers'
import { withRouter } from 'react-router'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this)
  }

  handleSubmitLoginForm (e) {
    e.preventDefault()
    const { validateFields } = this.props.form
    validateFields(async (errors, values) => {
      if (!errors) {
        const { login } = this.props
        const result = await login(values.username, values.password)
        if (result.error) {
          notification.error({
            message: result.error.message
          })
        } else {
          this.props.history.push('/dashboard')
          notification.success({
            message: 'Login successfully'
          })
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmitLoginForm}>
        <Form.Item>{getFieldDecorator('username')(<Input />)}</Form.Item>
        <Form.Item>
          {getFieldDecorator('password')(<Input.Password />)}
        </Form.Item>
        <Button htmlType='submit' type='primary' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispathToProps = (dispatch, props) => {
  return {
    ...handlers(dispatch, props)
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(Form.create({ name: 'login-form' })(LoginForm)))
