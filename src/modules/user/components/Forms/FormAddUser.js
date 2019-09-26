import React, { Component } from 'react'
import { Form, Input, Radio, DatePicker, Button, notification } from 'antd'
import { catchErrorAndNotification } from '../../../../common/utils/Notification'
import modal from '../../../../common/components/widgets/Modal'

export class FormAddUser extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleSubmitForm (e) {
    e.preventDefault()
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        const result = await this.props.addUser(values)
        console.log(result)
        if (result && result.success && result.success === true) {
          notification.success({
            message: 'Add Staff success'
          })
          modal.hide()
          await this.props.getData()
        } else catchErrorAndNotification(result.error)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmitForm}>
        <Form.Item label='Name'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter name' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Gender'>
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please enter gender' }],
            initialValue: 'male'
          })(
            <Radio.Group>
              <Radio value='male'>Male</Radio>
              <Radio value='female'>Female</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='Birthday'>
          {getFieldDecorator('birthday', {
            rules: [{ required: true, message: 'Please enter birthday' }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label='Identifier'>
          {getFieldDecorator('identifier', {
            rules: [{ required: true, message: 'Please enter identifier' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Phone'>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please enter phone' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Address'>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter Address' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please enter email' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Password'>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter password' }]
          })(<Input.Password></Input.Password>)}
        </Form.Item>
        <div style={{ textAlign: 'center' }}><Button htmlType='submit' style={{ width: 100 }} type='primary'>Submit</Button></div>
      </Form>
    )
  }
}

export default Form.create({ name: 'formAddUser' })(FormAddUser)
