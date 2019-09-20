import React, { Component } from 'react'
import { Layout, Menu, Icon, Row, Col, Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router'
import menuConstant from './Menu'
import UnderConstruction from '../components/UnderConstruction'
const { Header, Content, Footer, Sider } = Layout

const nameLogo = 'Food Restaurant'

export class MainLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSelect = this.handleSelect.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
  }

  handleSelect (value) {
    this.props.history.push(`/${value.key}`)
  }
  ;
  handleShowMenu () {
    const { mode } = this.props
    const menu = menuConstant[mode]
    const { SubMenu } = Menu
    const renderMenu = []
    menu.forEach(item => {
      let menuItemArray = []
      if (item.children.length !== 0) {
        menuItemArray = item.children.map(menuItem => {
          return (
            <Menu.Item key={menuItem.key}>
              <span>
                <Icon type={menuItem.icon} />
                {menuItem.name}
              </span>
            </Menu.Item>
          )
        })
        renderMenu.push(
          <SubMenu
            title={
              <span>
                <Icon type={item.icon} />
                {item.name}
              </span>
            }
            key={item.key}
          >
            {menuItemArray}
          </SubMenu>
        )
      } else {
        renderMenu.push(
          <Menu.Item key={item.key}>
            <span>
              <Icon type={item.icon} key={item} />
              {item.name}
            </span>
          </Menu.Item>
        )
      }
    })
    return (
      <Menu
        menu='inline'
        onSelect={this.handleSelect}
        theme='dark'
        mode='inline'
      >
        {renderMenu}
      </Menu>
    )
  }
  ;
  render () {
    const { mode } = this.props
    if (mode) {
      return (
        <Layout style={{ height: '100%' }}>
          <Sider
            breakpoint='lg'
            collapsedWidth='0'
            onBreakpoint={broken => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
            theme='dark'
          >
            <div className='logo' />
            <div
              style={{
                textAlign: 'center',
                fontSize: '1.2em',
                padding: '20px 0px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {nameLogo}
            </div>
            {this.handleShowMenu()}
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Row>
                <Col span={6} />
                <Col offset={12} span={6}>
                  <Menu
                    selectable={false}
                    theme='light'
                    mode='horizontal'
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px', float: 'right' }}
                  >
                    <Menu.Item>
                      <Dropdown
                        overlay={
                          <Menu style={{ width: 180, fontSize: '1.2em' }}>
                            <Menu.Item>
                              <Icon type='user' />
                              My Profile
                            </Menu.Item>
                            <Menu.Item>
                              <Icon type='poweroff' />
                              Logout
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Avatar
                          style={{ width: 50, height: 50 }}
                          src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        />
                      </Dropdown>
                    </Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                margin: '24px 16px 0',
                height: '100%',
                backgroundColor: '#F4F3EF'
              }}
            >
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  minHeight: 360,
                  height: '100%'
                }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )
    } else return <UnderConstruction />
  }
}

export default withRouter(MainLayout)
