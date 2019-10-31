import React, { Component } from 'react'
import { Card, Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

class CustomBreadcrumb extends Component {
  render() {
    const items = Array.isArray(this.props.items) ? this.props.items : []
    return (
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 3 }}>
        <Breadcrumb>
          {items &&
            items.map((item, i) => (
              <Breadcrumb.Item key={i}>
                <Link to={item.url || ''}>
                  {item.icon ? <Icon type={item.icon} /> : ''}{' '}
                  {item.title || ''}
                </Link>
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
      </Card>
    )
  }
}

export default CustomBreadcrumb
