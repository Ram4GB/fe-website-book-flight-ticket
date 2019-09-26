import React, { Component } from 'react'
import { LIMIT } from '../models'
import { catchErrorAndNotification } from '../../../common/utils/Notification'
import { Card, Table, Button, Tag, Avatar, notification } from 'antd'
import modal from '../../../common/components/widgets/Modal'
import FormAddUser from './Forms/FormAddUser'
import moment from 'moment'
const columns = [
  {
    title: 'Image',
    key: 'image',
    render: record => {
      return record.gender === 'female' ? (
        <Avatar src='https://inspireducation.org.pk/wp-content/uploads/2019/06/person-girl-flat.png' />
      ) : (
        <Avatar src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' />
      )
    }
  },
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
    key: 'birthday',
    render: value => {
      return <span>{moment(value).format('MMM Do YY')}</span>
    }
  },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: value => {
      return <Tag color='blue'>{value}</Tag>
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: record => {
      return (
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button icon='info-circle' />
          <Button type='primary' icon='edit' />
          <Button type='danger' icon='delete' />
        </span>
      )
    }
  }
]
export class UserComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      totalRecord: 0,
      page: 1,
      limit: LIMIT,
      params: {
        // please dont put params there just call exaple params.name
      }
    }
    this.handleShowFormAddUser = this.handleShowFormAddUser.bind(this)
    this.handleChangeTableUsers = this.handleChangeTableUsers.bind(this)
    this.getData = this.getData.bind(this)
  }

  async componentDidMount () {
    await this.getData()
    console.log(this.props)
  }

  async getData (input) {
    const { page, params } = this.state
    const { getListCashier } = this.props
    const next = input || page
    const result = await getListCashier(next, params)
    if (result && result.success === true) {
      this.setState({
        page: next,
        totalRecord: result.totalRecord
      })
    } else if (result && result.success === 'false') {
      catchErrorAndNotification(result.error)
    } else {
      notification.error({
        message: 'Server error'
      })
    }
  }

  handleShowFormAddUser () {
    const { addCashier } = this.props
    modal.show(<FormAddUser getData={this.getData} addUser={addCashier} />, {
      title: 'Form Add Staff',
      width: '60%',
      style: { top: 10, minWidth: 300 }
    })
  }

  handleChangeTableUsers (pagination) {
    this.getData(pagination.current)
  }

  render () {
    const { page, limit, totalRecord } = this.state
    const { users } = this.props
    return (
      <Card
        extra={
          <>
            <Button onClick={this.handleShowFormAddUser} type='primary'>
              Add Staff
            </Button>
          </>
        }
      >
        <Table
          onChange={this.handleChangeTableUsers}
          rowKey={user => {
            console.log(user)
            return user.id
          }}
          dataSource={users}
          columns={columns}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalRecord,
            size: 'small'
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    )
  }
}

export default UserComponent
