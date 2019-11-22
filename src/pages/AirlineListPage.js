import React, { Component } from 'react'
import AirlineListContainer from '../modules/flight/containers/AirlineListContainer'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'

export class AirlineListPage extends Component {
  componentWillMount() {
    document.title = 'FlyNow | Quản lí Hãng hàng không'
  }
  render() {
    const { history } = this.props
    return (
      <>
        <CustomBreadcrumb
          items={[
            {
              url: '/admin/dashboard',
              icon: 'home',
              title: 'Bảng điều khiển',
            },
            { url: '/admin/airline', icon: 'rocket', title: 'Hãng hàng không' },
          ]}
        ></CustomBreadcrumb>
        <AirlineListContainer history={history}></AirlineListContainer>
      </>
    )
  }
}

export default AirlineListPage
