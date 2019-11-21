import React, { Component } from "react";
import background from "../../../common/assets/images/wall1.png";
import { Card, Carousel } from "antd";
import { withRouter } from "react-router";
import FormRegisterHomepage from "./FormRegisterHomepage";
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
import { connect } from "react-redux";
import handlers from "../../flight/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { DEFAULT_URL } from "../../../common/url";

class RegisterFlyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlines: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    document.title = "FlyNow | Tìm chuyến bay";
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.setParamsRegisterFly(values);
        this.props.history.push("/step-register");
      }
    });
  }
  async getDataAirline() {
    let result = await this.props.getListAirPlane();
    if (result && result.success) {
      this.setState({
        airlines: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showLogoAirline() {
    return this.state.airlines.map(airline => {
      return (
        <img
          alt=""
          key={airline.id}
          src={DEFAULT_URL + "/" + airline.logo}
          className="image-logo-flight"
        />
      );
    });
  }
  async componentDidMount() {
    await this.getDataAirline();
  }
  render() {
    // console.log(this.props.paramsRegisterFly);
    const { paramsRegisterFly, history, setParamsRegisterFly } = this.props;
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="container d-flex justify-content-center flex-wrap align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <Card style={{ marginTop: 24, marginBottom: 24 }}>
                <Carousel autoplay effect="fade">
                  <div>
                    <img
                      alt=""
                      className="w-100 h-100"
                      src="https://res.flynow.vn/Seo/Combo%20Da%20Nang-01.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      className="w-100 h-100"
                      src="https://res.flynow.vn/Seo/25-9-01.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      className="w-100 h-100"
                      src="https://res.flynow.vn/Seo/gohub.jpg"
                    />
                  </div>
                </Carousel>
              </Card>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <Card style={{ marginTop: 24, marginBottom: 24 }}>
                <FormRegisterHomepage
                  history={history}
                  paramsRegisterFly={paramsRegisterFly}
                  setParamsRegisterFly={setParamsRegisterFly}
                ></FormRegisterHomepage>
              </Card>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#fff", padding: 30, borderRadius: 5 }}
          className=" container-fluid"
        >
          <div className="container">
            <div style={{ padding: "20px 10px" }} className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <h5 style={{ fontWeight: "bold", fontSize: 24 }}>
                  Đối tác hàng không
                </h5>
                <h6
                  style={{ color: "#8f8f8f", fontWeight: "bold", fontSize: 19 }}
                >
                  Đối tác hàng không nội địa và quốc tế
                </h6>
                <h6 style={{ fontSize: 17 }}>
                  Những đối tác hàng không toàn cầu sẽ chắp cánh đưa bạn đến mọi
                  địa điểm trên thế giới.
                </h6>
              </div>
              <div className="col-lg-8 col-md-6 col-sm-12">
                {this.showLogoAirline()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => {
  return {
    ...handlers(dispatch)
  };
})(withRouter(RegisterFlyComponent));
