import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Avatar,
  Descriptions,
  Typography,
  Tag,
  Button,
} from 'antd'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import { getAirlineByID } from '../modules/flight/handlers'
import { emptyString } from '../modules/flight/models'
import { DEFAULT_URL } from '../common/url'

export class AirlineInformationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airline: {},
    }
    this.getAirlineByID = this.getAirlineByID.bind(this)
  }
  componentWillMount() {
    document.title = 'FlyNow | Thông tin Hãng hàng không'
  }
  async getAirlineByID() {
    let result = await getAirlineByID(this.props.match.params.id)
    if (result && result.success) {
      this.setState({
        airline: result.airline,
      })
    }
  }
  componentDidMount() {
    this.getAirlineByID(this.props.match.params.id)
  }
  render() {
    const { airline } = this.state
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng điều khiển' },
            {
              url: '/admin/airline',
              icon: 'rocket',
              title: 'Hãng hàng không',
            },
            {
              url: `/admin/airline/${this.props.match.params.id}`,
              icon: 'rocket',
              title: 'Thông tin hãng hàng không',
            },
          ]}
        ></CustomBreadcrumb>
        <>
          {this.state.airline ? (
            <Row gutter={6} style={{ display: 'flex' }}>
              <Col lg={7}>
                <Card style={{ height: '100%' }}>
                  <Avatar
                    src={`${DEFAULT_URL}/${airline.logo}`}
                    style={{
                      width: '100%',
                      maxWidth: 200,
                      minWidth: 200,
                      height: 200,
                      display: 'block',
                      margin: 'auto',
                    }}
                  />
                  <Typography.Title
                    style={{ textAlign: 'center', marginTop: 15 }}
                    level={4}
                  >
                    {airline.name}
                  </Typography.Title>
                  <div style={{ textAlign: 'center' }}>
                    <Tag color='#1890ff'>Active</Tag>
                  </div>
                </Card>
              </Col>
              <Col lg={17}>
                <Card
                  style={{ height: '100%' }}
                  title={
                    <div>
                      <span>Thông tin</span>
                      <Button
                        style={{ marginLeft: 10 }}
                        type='primary'
                        icon='edit'
                        size='small'
                        onClick={() => {
                          this.props.history.push(
                            `/admin/airline/${this.props.match.params.id}/edit`,
                          )
                        }}
                      >
                        Sửa
                      </Button>
                    </div>
                  }
                >
                  <Descriptions bordered column={1}>
                    <Descriptions.Item label={<strong>Người liên lạc</strong>}>
                      {airline.contact_info
                        ? airline.contact_info
                        : emptyString}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Số điện thoại</strong>}>
                      {airline.phone ? airline.phone : emptyString}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Trang Web</strong>}>
                      {airline.website}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Mô tả</strong>}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: airline.description
                            ? airline.description
                            : emptyString,
                        }}
                      ></div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          ) : null}
        </>
      </>
    )
  }
}

export default AirlineInformationPage
