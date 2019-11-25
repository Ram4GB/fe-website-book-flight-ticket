import React, { Component } from 'react'
import background from '../../../common/assets/images/wall1.png'
import { Card, Divider } from 'antd'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { withRouter } from 'react-router'
import FormRegisterHomepage from './FormRegisterHomepage'
// import vietjec from "../../../common/assets/images/vietjet.png";
// import jetstar from "../../../common/assets/images/jetstar.png";
// import thailion from "../../../common/assets/images/thailion.png";
// import hok from "../../../common/assets/images/hok.png";
// // import scoot from "../../../common/assets/images/scoot.jpg";
// import vietnamairline from "../../../common/assets/images/vietnamairline.png";
// // Quốc tế brand
// import airasia from "../../../common/assets/images/airasia.png";
// import logo1 from "../../../common/assets/images/logo-1.png";
// import logo2 from "../../../common/assets/images/logo-2.png";
// import logo3 from "../../../common/assets/images/logo-3.png";
// import logo4 from "../../../common/assets/images/logo-4.png";
// import logo5 from "../../../common/assets/images/logo-5.png";
// import logo6 from "../../../common/assets/images/log-6.png";
// import logo7 from "../../../common/assets/images/logo-7.jpg";
// import logo8 from "../../../common/assets/images/logo-8.png";
// import logo9 from "../../../common/assets/images/logo-9.png";
// import logo10 from "../../../common/assets/images/logo-10.png";
// import logo11 from "../../../common/assets/images/logo-11.png";
import { connect } from 'react-redux'
import handlers from '../../flight/handlers'
import { catchErrorAndNotification } from '../../../common/utils/Notification'
import { DEFAULT_URL } from '../../../common/url'

class RegisterFlyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airlines: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    document.title = "FlyNow | Tìm chuyến bay";
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.setParamsRegisterFly(values)
        this.props.history.push('/step-register')
      }
    })
  }
  async getDataAirline() {
    let result = await this.props.getListAirline()
    if (result && result.success) {
      this.setState({
        airlines: result.data,
      })
    } else catchErrorAndNotification(result.error)
  }
  showLogoAirline() {
    return this.state.airlines.map(airline => {
      return (
        <img
          alt=''
          key={airline.id}
          src={DEFAULT_URL + '/' + airline.logo}
          className='image-logo-flight'
        />
      )
    })
  }
  async componentDidMount() {
    await this.getDataAirline()
  }
  render() {
    // console.log(this.props.paramsRegisterFly);
    const { paramsRegisterFly, history, setParamsRegisterFly } = this.props
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='container d-flex justify-content-center flex-wrap align-items-center'>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <Card
                title={<b>TÌM CHUYẾN BAY</b>}
                style={{ marginTop: 24, marginBottom: 24 }}
              >
                <FormRegisterHomepage
                  history={history}
                  paramsRegisterFly={paramsRegisterFly}
                  setParamsRegisterFly={setParamsRegisterFly}
                ></FormRegisterHomepage>
              </Card>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <Card style={{ marginTop: 24, marginBottom: 24 }}>
                <Carousel autoPlay={true} interval={1000} infiniteLoop={true}>
                  <div>
                    <img
                      alt='img'
                      src='https://res.flynow.vn/Seo/Combo%20Da%20Nang-01.jpg'
                    />
                  </div>
                  <div>
                    <img
                      alt='img'
                      src='https://res.flynow.vn/Seo/25-9-01.jpg'
                    />
                  </div>
                  <div>
                    <img alt='img' src='https://res.flynow.vn/Seo/gohub.jpg' />
                  </div>
                </Carousel>
              </Card>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px 0',
            borderRadius: 5,
          }}
          className=' container-fluid'
        >
          <div className='container'>
            <div className='row justify-content-around'>
              <div className='col-xs-3 text-center'>
                <p className='box-icon'>
                  <svg
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='50'
                    height='50'
                    viewBox='0 0 32 32'
                  >
                    <title>home-solgan-search</title>
                    <path
                      fill='#5a5954'
                      d='M20.976 0c-6.079 0-11.024 4.945-11.024 11.024 0 2.501 0.838 4.81 2.247 6.661l-2.233 2.233c-0.014 0.014-0.027 0.029-0.039 0.044-0.183-0.038-0.37-0.058-0.561-0.058-0.729 0-1.415 0.284-1.931 0.8l-6.635 6.635c-0.516 0.516-0.799 1.201-0.799 1.93s0.284 1.415 0.799 1.93c0.516 0.516 1.201 0.8 1.931 0.8s1.415-0.284 1.93-0.8l6.635-6.635c0.516-0.516 0.799-1.201 0.799-1.93 0-0.191-0.020-0.379-0.058-0.562 0.016-0.012 0.030-0.025 0.044-0.039l2.233-2.233c1.852 1.409 4.161 2.246 6.662 2.246 6.078 0 11.024-4.945 11.024-11.024s-4.945-11.024-11.023-11.024v0zM3.927 30.467c-0.32 0.32-0.745 0.496-1.197 0.496s-0.877-0.176-1.198-0.496c-0.32-0.32-0.496-0.745-0.496-1.197s0.176-0.877 0.496-1.197l5.992-5.992 2.394 2.394-5.992 5.992zM10.649 23.738l-2.387-2.386c0.316-0.272 0.709-0.41 1.103-0.41 0.434 0 0.867 0.165 1.197 0.495 0.32 0.32 0.496 0.745 0.496 1.197 0 0.41-0.145 0.797-0.409 1.104v0zM11.592 21.057c-0.089-0.124-0.187-0.242-0.297-0.352s-0.228-0.209-0.352-0.297l1.924-1.924c0.207 0.225 0.424 0.442 0.649 0.649l-1.924 1.923zM20.976 21.011c-5.507 0-9.987-4.48-9.987-9.987s4.48-9.987 9.987-9.987 9.987 4.48 9.987 9.987c0 5.507-4.481 9.987-9.987 9.987v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M20.976 2.212c-4.859 0-8.812 3.953-8.812 8.812s3.953 8.812 8.812 8.812 8.812-3.953 8.812-8.812c-0-4.859-3.953-8.812-8.812-8.812v0zM20.976 18.799c-4.287 0-7.775-3.488-7.775-7.775s3.488-7.775 7.775-7.775 7.775 3.488 7.775 7.776c0 4.287-3.488 7.775-7.775 7.775v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M22.176 4.532c-0.393-0.072-0.796-0.109-1.2-0.109-0.286 0-0.518 0.232-0.518 0.518s0.232 0.518 0.518 0.518c0.34 0 0.681 0.031 1.012 0.092 0.032 0.006 0.063 0.009 0.095 0.009 0.245 0 0.463-0.175 0.509-0.425 0.052-0.282-0.134-0.552-0.416-0.603v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M18.42 11.276c0.547 0.682 1.094 1.364 1.64 2.045 0.231 0.289 0.636 0.131 0.814-0.105 1.538-2.029 3.075-4.058 4.613-6.087 0.403-0.532-0.497-1.049-0.895-0.523-1.538 2.029-3.075 4.058-4.613 6.087 0.271-0.035 0.543-0.070 0.814-0.105-0.547-0.682-1.094-1.364-1.64-2.045-0.417-0.52-1.147 0.218-0.733 0.733v0z'
                    ></path>
                  </svg>
                </p>
                <p className='font-weight-bold mt15'>Dễ dàng tìm kiếm chuyến bay</p>
                <p>Trên 100 hãng hàng không</p>
              </div>
              <div className='col-xs-3 text-center'>
                <p className='box-icon'>
                  <svg
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='50'
                    height='50'
                    viewBox='0 0 32 32'
                  >
                    <title>home-solgan-payment</title>
                    <path
                      fill='#5a5954'
                      d='M28.8 4.267c0-0.588-0.479-1.067-1.067-1.067s-1.067 0.478-1.067 1.067c0 0.588 0.479 1.067 1.067 1.067s1.067-0.478 1.067-1.067v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M27.2 9.6c-0.294 0-0.534 0.239-0.534 0.534v19.2c0 0.883-0.717 1.6-1.6 1.6h-18.134c-0.882 0-1.6-0.717-1.6-1.6v-18.666h19.733c0.295 0 0.534-0.239 0.534-0.534s-0.238-0.534-0.534-0.534h-20.266c-0.294 0-0.534 0.239-0.534 0.534v19.2c0 1.47 1.197 2.667 2.667 2.667h18.134c1.471 0 2.667-1.197 2.667-2.667v-19.2c0-0.294-0.239-0.534-0.534-0.534v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M24 4.8c0.295 0 0.534-0.238 0.534-0.534s-0.238-0.533-0.534-0.533h-5.333c-0.294 0-0.534 0.239-0.534 0.533s0.239 0.534 0.534 0.534h5.333z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M28.8 12.266c0 0.295 0.239 0.534 0.533 0.534 0.295 0 0.534-0.238 0.534-0.534v-4.267c0-0.294-0.238-0.533-0.534-0.533h-26.666c-0.294 0-0.533 0.239-0.533 0.533v4.267c0 0.295 0.239 0.534 0.533 0.534 0.295 0 0.534-0.238 0.534-0.534v-3.733h25.6v3.733z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M10.5 11.754c-0.284-0.080-0.579 0.084-0.658 0.368-0.16 0.566-0.242 1.153-0.242 1.745 0 3.529 2.871 6.4 6.4 6.4s6.4-2.871 6.4-6.4c0-0.592-0.081-1.179-0.241-1.745-0.080-0.283-0.377-0.446-0.658-0.368-0.283 0.080-0.448 0.375-0.368 0.658 0.133 0.472 0.201 0.961 0.201 1.455 0 2.942-2.393 5.333-5.333 5.333s-5.333-2.392-5.333-5.333c0-0.494 0.068-0.983 0.201-1.455 0.080-0.284-0.084-0.579-0.368-0.659v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M29.333 0h-26.666c-1.47 0-2.667 1.197-2.667 2.667v11.733c0 1.47 1.197 2.667 2.667 2.667 0.295 0 0.534-0.238 0.534-0.533s-0.238-0.534-0.534-0.534c-0.882 0-1.6-0.717-1.6-1.6v-11.733c0-0.882 0.718-1.6 1.6-1.6h26.667c0.883 0 1.6 0.718 1.6 1.6v11.733c0 0.883-0.717 1.6-1.6 1.6-0.294 0-0.534 0.239-0.534 0.533 0 0.295 0.239 0.534 0.534 0.534 1.47 0 2.667-1.196 2.667-2.667v-11.733c0-1.47-1.197-2.667-2.667-2.667v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M6.933 11.733c-0.294 0-0.533 0.239-0.533 0.533v13.867c0 0.295 0.239 0.533 0.533 0.533 1.47 0 2.667 1.197 2.667 2.667 0 0.295 0.239 0.534 0.534 0.534h11.733c0.295 0 0.533-0.238 0.533-0.534 0-1.47 1.197-2.667 2.667-2.667 0.295 0 0.534-0.238 0.534-0.533v-13.867c0-0.294-0.238-0.533-0.534-0.533s-0.533 0.239-0.533 0.533v13.372c-1.633 0.235-2.927 1.529-3.162 3.162h-10.743c-0.234-1.633-1.529-2.927-3.162-3.162v-13.372c0-0.294-0.238-0.533-0.534-0.533v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M14.4 12.8c0.295 0 0.533-0.238 0.533-0.534s-0.238-0.533-0.533-0.533c-0.991 0-1.819 0.682-2.058 1.6h-0.076c-0.294 0-0.533 0.239-0.533 0.533 0 0.295 0.239 0.534 0.533 0.534h0.076c0.239 0.918 1.067 1.6 2.058 1.6 1.177 0 2.133-0.957 2.133-2.134 0-0.588 0.479-1.067 1.067-1.067s1.067 0.479 1.067 1.067c0 0.588-0.479 1.067-1.067 1.067-0.294 0-0.534 0.239-0.534 0.533 0 0.295 0.239 0.534 0.534 0.534 0.991 0 1.82-0.682 2.058-1.6h0.075c0.295 0 0.534-0.238 0.534-0.534 0-0.294-0.238-0.533-0.534-0.533h-0.075c-0.238-0.917-1.067-1.6-2.058-1.6-1.177 0-2.134 0.957-2.134 2.133 0 0.588-0.478 1.067-1.067 1.067s-1.067-0.479-1.067-1.067c0-0.588 0.479-1.067 1.067-1.067v0z'
                    ></path>
                  </svg>
                </p>
                <p className='font-weight-bold  mt15'>Thanh toán nhanh chóng</p>
                <p>Tiện lợi và tin cậy</p>
              </div>
              <div className='col-xs-3 text-center'>
                <p className='box-icon'>
                  <svg
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='41'
                    height='48'
                    viewBox='0 0 26 32'
                  >
                    <title>home-solgan-support</title>
                    <path
                      fill='#5a5954'
                      d='M24.518 20.628l-0.006-0.005c-0.919-0.855-1.734-1.449-2.48-1.802 1.651-1.662 2.61-3.943 2.61-6.309 0-4.927-4.009-8.936-8.936-8.936-1.926 0-3.808 0.635-5.342 1.775-0.199-0.855-0.689-1.832-1.497-3.006-1.085-1.578-2.217-2.345-3.463-2.345-1.475 0-2.671 1.081-3.726 2.035-0.185 0.167-0.359 0.325-0.53 0.471-0.64 0.539-1.029 1.446-1.126 2.624-0.143 1.746 0.353 4.055 1.397 6.5 1.177 2.756 3.019 5.636 5.326 8.326 5.263 6.213 10.896 8.994 14.143 8.994 0.943 0 1.693-0.228 2.229-0.676l0.008-0.007c0.18-0.155 0.371-0.313 0.575-0.479 1.197-0.982 2.554-2.095 2.615-3.726 0.042-1.119-0.547-2.242-1.798-3.435zM10.255 6.939c1.456-1.451 3.455-2.281 5.513-2.281 4.304 0 7.806 3.502 7.806 7.806 0 2.34-1.074 4.587-2.885 6.059-0.021-0-0.042-0.001-0.062-0.001-1.251 0-2.138 0.752-3.065 1.564-0.002 0.002-0.004 0.003-0.006 0.005-0.020 0.018-0.040 0.035-0.060 0.053-0.102 0.089-0.206 0.18-0.314 0.273-0.055 0.048-0.132 0.097-0.286 0.097-0.567 0-2.030-0.599-5.461-4.605-1.448-1.703-2.442-3.061-3.040-4.152-0.593-1.081-0.768-1.885-0.471-2.153 0.086-0.071 0.172-0.141 0.257-0.211 0.894-0.731 1.741-1.425 2.074-2.454zM23.104 27.072c-0.213 0.175-0.415 0.34-0.611 0.509-0.296 0.245-0.785 0.375-1.415 0.375-2.918 0-8.374-2.734-13.462-8.74-2.278-2.655-4.090-5.485-5.242-8.184-0.985-2.308-1.457-4.445-1.327-6.019 0.068-0.83 0.309-1.458 0.68-1.768l0.007-0.005c0.188-0.161 0.373-0.33 0.571-0.508 0.308-0.279 0.63-0.57 0.961-0.833 0.362 0.398 0.934 1.063 1.541 1.91 0.132 0.184 0.338 0.282 0.549 0.282 0.136 0 0.273-0.041 0.392-0.126 0.302-0.217 0.372-0.638 0.155-0.941-0.563-0.786-1.093-1.419-1.477-1.853 0.264-0.111 0.529-0.176 0.792-0.176 0.787 0 1.608 0.612 2.437 1.819 1.102 1.602 1.546 2.774 1.357 3.582-0.167 0.716-0.836 1.262-1.681 1.955-0.089 0.073-0.179 0.146-0.27 0.221l-0.013 0.011c-0.866 0.753-0.81 2.039 0.168 3.823 0.642 1.172 1.688 2.603 3.196 4.379 2.966 3.465 5.027 5.078 6.486 5.078 0.445 0 0.849-0.148 1.169-0.426 0.006-0.005 0.012-0.010 0.018-0.015 0.345 0.214 0.863 0.544 1.4 0.92 0.445 0.312 0.829 0.604 1.14 0.866 0.126 0.107 0.281 0.159 0.434 0.159 0.192 0 0.382-0.081 0.516-0.24 0.24-0.285 0.204-0.71-0.081-0.95-0.343-0.289-0.758-0.605-1.236-0.94-0.396-0.278-0.78-0.53-1.098-0.733 0.492-0.381 0.952-0.634 1.468-0.634 0.815 0 1.875 0.617 3.241 1.886 0.971 0.925 1.45 1.763 1.422 2.49-0.040 1.064-1.131 1.959-2.186 2.825z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M7.039 6.44c0.112 0 0.225-0.028 0.33-0.086 0.325-0.182 0.44-0.593 0.257-0.918-0.106-0.189-0.211-0.356-0.33-0.525-0.215-0.304-0.635-0.377-0.939-0.162s-0.377 0.635-0.162 0.939c0.092 0.131 0.174 0.26 0.257 0.408 0.123 0.219 0.352 0.343 0.588 0.343z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M23.116 23.574c-0.26-0.265-0.685-0.269-0.951-0.010s-0.272 0.685-0.014 0.952c0.003 0.003 0.079 0.082 0.371 0.409 0.133 0.148 0.317 0.224 0.502 0.224 0.16 0 0.321-0.057 0.45-0.172 0.277-0.248 0.3-0.675 0.052-0.952-0.313-0.349-0.397-0.436-0.411-0.45z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M17.314 13.429h2.237v1.1c0 0.252 0.307 0.382 0.606 0.382 0.308 0 0.606-0.131 0.606-0.382v-1.1h0.438c0.195 0 0.382-0.28 0.382-0.559 0-0.289-0.131-0.568-0.382-0.568h-0.438v-0.979c0-0.27-0.298-0.382-0.606-0.382-0.298 0-0.606 0.112-0.606 0.382v0.979h-1.090l1.789-3.579c0.028-0.056 0.047-0.112 0.047-0.159 0-0.279-0.391-0.466-0.606-0.466-0.195 0-0.4 0.084-0.512 0.317l-2.209 4.342c-0.047 0.084-0.065 0.168-0.065 0.242 0 0.27 0.177 0.429 0.41 0.429z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M12.511 14.911h3.318c0.205 0 0.382-0.261 0.382-0.54s-0.177-0.522-0.382-0.522h-2.591v-0.223c0-0.969 2.954-1.622 2.954-3.634 0-1.184-1.006-1.892-2.088-1.892-1.034 0-2.003 0.652-2.003 1.715 0 0.503 0.233 0.652 0.55 0.652 0.401 0 0.633-0.223 0.633-0.447 0-0.578 0.373-0.82 0.83-0.82 0.615 0 0.867 0.447 0.867 0.83 0 1.314-3.001 2.106-3.001 3.597v0.904c0 0.232 0.317 0.381 0.531 0.381z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M19.899 30.652h-13.481c-0.372 0-0.674 0.302-0.674 0.674s0.302 0.674 0.674 0.674h13.481c0.372 0 0.674-0.302 0.674-0.674s-0.302-0.674-0.674-0.674z'
                    ></path>
                  </svg>
                </p>
                <p className='font-weight-bold  mt15'>Đặt vé máy bay 24/7</p>
                <p>Chăm sóc tận tình chu đáo</p>
              </div>
              <div className='col-xs-3 text-center'>
                <p className='box-icon'>
                  <svg
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='65'
                    height='48'
                    viewBox='0 0 43 32'
                  >
                    <title>home-solgan-sale</title>
                    <path
                      fill='none'
                      stroke='#4469b0'
                      strokeWidth='1.2633'
                      strokeMiterlimit='10'
                      strokeLinecap='butt'
                      strokeLinejoin='miter'
                      d='M28.174 2.703c4.154 0 7.954 4.073 7.954 9.15s-4.177 9.155-8.773 9.155'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M21.437 22.131c-1.912 0-3.468 1.556-3.468 3.468s1.556 3.468 3.468 3.468c1.912 0 3.468-1.556 3.468-3.468s-1.556-3.468-3.468-3.468v0zM21.437 27.708c-1.163 0-2.109-0.946-2.109-2.109s0.947-2.109 2.109-2.109 2.109 0.946 2.109 2.109c0 1.163-0.946 2.109-2.109 2.109v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M25.181 20.876c-1.059-0.841-2.389-1.304-3.744-1.304s-2.686 0.463-3.745 1.304c-0.294 0.234-0.343 0.661-0.109 0.955s0.661 0.343 0.955 0.11c0.831-0.66 1.834-1.009 2.899-1.009s2.067 0.349 2.898 1.009c0.125 0.099 0.274 0.147 0.423 0.147 0.2 0 0.398-0.088 0.533-0.257 0.233-0.293 0.184-0.721-0.11-0.955v0z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M32.711 29.682c1.081 0 1.961-0.879 1.961-1.961s-0.88-1.961-1.961-1.961-1.961 0.879-1.961 1.961c0 1.081 0.88 1.961 1.961 1.961v0zM32.711 27.12c0.331 0 0.601 0.27 0.601 0.601s-0.27 0.601-0.601 0.601-0.601-0.27-0.601-0.601c0-0.332 0.27-0.601 0.601-0.601v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M42.548 22.096c-0.321-0.195-0.739-0.033-0.934 0.288l-0.889 1.522h-11.75c-0.168-2.023-1.019-3.642-2.303-4.856h1.201c0.376 0 0.68-0.231 0.68-0.607s-0.304-0.607-0.68-0.607h-3.153c-0.8-0.405-1.25-0.826-2.464-0.908v-3.316c0-0.376-0.434-0.68-0.809-0.68s-0.809 0.304-0.809 0.68v3.316c-0.809 0.083-1.684 0.504-2.484 0.908h-3.152c-0.375 0-0.68 0.231-0.68 0.607s0.305 0.607 0.68 0.607h1.201c-1.284 1.214-2.135 2.833-2.303 4.856h-11.749l-0.889-1.522c-0.195-0.321-0.613-0.453-0.934-0.258s-0.423 0.598-0.227 0.919l1.088 1.769c0.123 0.203 0.344 0.307 0.581 0.307h5.518c-0.576 0.809-0.925 1.562-0.925 2.517 0 2.131 1.734 3.871 3.865 3.871s3.864-1.743 3.864-3.873c0-0.955-0.349-1.705-0.925-2.514h0.736c0.345 4.047 3.593 6.889 7.537 6.889s7.192-2.842 7.537-6.889h0.736c-0.576 0.809-0.925 1.562-0.925 2.517 0 2.131 1.734 3.871 3.865 3.871s3.864-1.743 3.864-3.873c0-0.955-0.349-1.705-0.925-2.514h5.518c0.237 0 0.457-0.112 0.581-0.314l1.088-1.783c0.195-0.321 0.093-0.733-0.227-0.928zM10.14 30.695c-1.64 0-2.974-1.334-2.974-2.974s1.334-2.974 2.974-2.974c1.64 0 2.973 1.334 2.973 2.974s-1.333 2.974-2.973 2.974zM21.437 30.952c-3.577 0-6.486-2.91-6.486-6.487s2.91-6.486 6.486-6.486c3.577 0 6.486 2.91 6.486 6.486s-2.909 6.487-6.486 6.487zM35.684 27.721c0 1.639-1.334 2.974-2.974 2.974s-2.974-1.334-2.974-2.974c0-1.64 1.334-2.974 2.974-2.974s2.974 1.334 2.974 2.974z'
                    ></path>
                    <path
                      fill='#5a5954'
                      d='M10.14 29.682c1.081 0 1.961-0.879 1.961-1.961s-0.88-1.961-1.961-1.961-1.961 0.879-1.961 1.961c0 1.081 0.88 1.961 1.961 1.961v0zM10.14 27.12c0.331 0 0.601 0.27 0.601 0.601s-0.27 0.601-0.601 0.601-0.601-0.27-0.601-0.601c0-0.332 0.27-0.601 0.601-0.601v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M34.319-0.031h-26.055v9.475h26.055c0 0 2.369-1.634 2.369-4.737s-2.369-4.737-2.369-4.737v0zM33.135 5.89c-0.654 0-1.184-0.53-1.184-1.184s0.53-1.184 1.184-1.184c0.654 0 1.184 0.53 1.184 1.184s-0.53 1.184-1.184 1.184v0z'
                    ></path>
                    <path
                      fill='#4469b0'
                      d='M33.135 6.483c0.98 0 1.776-0.797 1.776-1.777s-0.797-1.776-1.776-1.776c-0.98 0-1.776 0.797-1.776 1.776s0.797 1.777 1.776 1.777v0zM33.135 4.114c0.326 0 0.592 0.266 0.592 0.592s-0.266 0.592-0.592 0.592c-0.326 0-0.592-0.266-0.592-0.592s0.265-0.592 0.592-0.592v0z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M12.705 8.259h0.592c1.143 0 2.073-0.93 2.073-2.073s-0.93-2.073-2.073-2.073h-0.592c-0.49 0-0.888-0.399-0.888-0.888s0.399-0.888 0.888-0.888h0.592c0.49 0 0.888 0.399 0.888 0.888v0.296h1.184v-0.296c0-1.143-0.93-2.073-2.073-2.073h-0.592c-1.143 0-2.073 0.93-2.073 2.073s0.93 2.073 2.073 2.073h0.592c0.49 0 0.888 0.399 0.888 0.888s-0.399 0.888-0.888 0.888h-0.592c-0.49 0-0.888-0.399-0.888-0.888v-0.296h-1.184v0.296c0 1.143 0.93 2.073 2.073 2.073v0z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M17.146 5.89h2.369v2.369h1.184v-4.737c0-1.307-1.062-2.369-2.369-2.369s-2.369 1.062-2.369 2.369v4.737h1.184v-2.369zM18.331 2.337c0.653 0 1.184 0.531 1.184 1.184v1.184h-2.369v-1.184c-0-0.654 0.531-1.184 1.184-1.184v0z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M25.437 7.075h-2.369v-5.922h-1.184v7.106h3.553v-1.184z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M30.174 7.075h-2.369v-1.777h2.369v-1.184h-2.369v-1.776h2.369v-1.184h-3.553v7.106h3.553v-1.184z'
                    ></path>
                  </svg>
                </p>
                <p className='font-weight-bold  mt15'>Săn vé máy bay giá rẻ</p>
                <p>Khuyến mại quanh năm</p>
              </div>
            </div>
          </div>
          
          <div className='container'>
            <Divider />
            <div style={{ padding: '20px 10px' }} className='row'>
              <div className='col-lg-4 col-md-6 col-sm-12'>
                <h5 style={{ fontWeight: 'bold', fontSize: 24 }}>
                  Đối tác hàng không
                </h5>
                <br />
                <h6
                  style={{ color: '#8f8f8f', fontWeight: 'bold', fontSize: 19 }}
                >
                  Đối tác hàng không nội địa
                </h6>
                <h6 style={{ fontSize: 17 }}>
                  Những đối tác hàng không sẽ chắp cánh đưa bạn đến mọi địa
                  điểm.
                </h6>
              </div>
              <div className='col-lg-8 col-md-6 col-sm-12'>
                {this.showLogoAirline()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, dispatch => {
  return {
    ...handlers(dispatch),
  }
})(withRouter(RegisterFlyComponent))
