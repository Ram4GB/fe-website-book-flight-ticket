import React, { Component } from 'react'
import { Card, Icon, Table } from 'antd'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'
import Column from 'antd/lib/table/Column'
const data2 = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
]
const cols2 = {
  value: {
    min: 0,
  },
  year: {
    range: [0, 1],
  },
}
const cols = {
  sales: {
    tickInterval: 20,
  },
}
const data = [
  {
    year: '1951 年',
    sales: 38,
  },
  {
    year: '1952 年',
    sales: 52,
  },
  {
    year: '1956 年',
    sales: 61,
  },
  {
    year: '1957 年',
    sales: 145,
  },
  {
    year: '1958 年',
    sales: 48,
  },
  {
    year: '1959 年',
    sales: 38,
  },
  {
    year: '1960 年',
    sales: 38,
  },
  {
    year: '1962 年',
    sales: 38,
  },
]
export class DashboardAdmin extends Component {
  render() {
    return (
      <div>
        <div className='d-flex row-custom'>
          <div className='col-card-3'>
            <Card className='card-1'>
              <div className='d-flex justify-content-between '>
                <span className='card-header-custom'>Khách hàng</span>
                <div className='icon-wrap'>
                  <i className='fal fa-users icon-custom'></i>
                </div>
              </div>
              <div className='number'>32,000</div>
              <div>
                <Icon className='custom-icon' type='arrow-up' />
                <span className='percent' style={{ color: 'green' }}>
                  5.15%{' '}
                </span>
                <span style={{ color: '#6a6a82 !important' }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
          <div className='col-card-3'>
            <Card className='card-1'>
              <div className='d-flex justify-content-between '>
                <span className='card-header-custom'>Đối tác</span>
                <div className='icon-wrap'>
                  <i className='fal fa-handshake icon-custom'></i>
                </div>
              </div>
              <div className='number'>32</div>
              <div>
                <Icon className='custom-icon' type='arrow-up' />
                <span className='percent' style={{ color: 'green' }}>
                  5.15%{' '}
                </span>
                <span style={{ color: '#6a6a82 !important' }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
          <div className='col-card-3'>
            <Card className='card-1'>
              <div className='d-flex justify-content-between '>
                <span className='card-header-custom'>Doanh thu</span>
                <div className='icon-wrap'>
                  <i className='fal fa-money-bill icon-custom'></i>
                </div>
              </div>
              <div className='number'>32,000,000</div>
              <div>
                <Icon className='custom-icon' type='arrow-up' />
                <span className='percent' style={{ color: 'green' }}>
                  5.15%{' '}
                </span>
                <span style={{ color: '#6a6a82 !important' }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
        </div>
        <div
          className='d-flex justify-content-between'
          style={{ marginTop: 25 }}
        >
          <Card
            className='card-1'
            title={<div className='title'>thống kê doanh thu tháng 11</div>}
            style={{ width: '49%', height: 620 }}
          >
            <Table
              pagination={{
                size: 'small',
                pageSize: 5,
              }}
              rowKey={e => e.id}
              dataSource={(function() {
                let a = []
                for (let i = 0; i < 11; i++) {
                  a.push({
                    id: i,
                    1: `MH37${i}`,
                    2: 'VietName Airline',
                    3: 50,
                    4: 40,
                    5: '80%',
                    6: '100$',
                  })
                }
                return a
              })()}
            >
              <Column
                title='Số hiệu chuyến bay'
                align='center'
                dataIndex='1'
              ></Column>
              <Column
                align='center'
                title='Hãng hàng không'
                dataIndex='2'
              ></Column>
              <Column align='center' title='Tổng số vé' dataIndex='3'></Column>
              <Column align='center' title='Số vé bán' dataIndex='4'></Column>
              <Column align='center' title='Tỉ lệ' dataIndex='5'></Column>
              <Column align='center' title='Doanh thu' dataIndex='6'></Column>
            </Table>
            {/* <div className="title">thống kê doanh thu tháng 11</div> */}
          </Card>
          <Card
            className='card-1'
            title={<div className='title'>thống kê theo loại vé</div>}
            style={{ width: '49%' }}
          >
            <Chart height={500} data={data} scale={cols} forceFit>
              <Axis name='year' />
              <Axis name='sales' />
              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
              />
              <Geom type='interval' position='year*sales' />
            </Chart>
            {/* <div className="title">thống kê theo loại vé</div> */}
          </Card>
        </div>
        <Card
          className='card-1'
          title={<div className='title'>thống kê doanh thu từng tháng</div>}
          style={{ marginTop: 25 }}
        >
          <Chart height={400} data={data2} scale={cols2} forceFit>
            <Axis name='year' />
            <Axis name='value' />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type='line' position='year*value' size={2} />
            <Geom
              type='point'
              position='year*value'
              size={4}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
          {/* <div className="title">thống kê doanh thu từng tháng</div> */}
        </Card>
      </div>
    )
  }
}

export default DashboardAdmin
