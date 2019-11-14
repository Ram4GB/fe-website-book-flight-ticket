import React, { Component } from "react";
import background from "../../../common/assets/images/wall1.png";
import { Card, Carousel } from "antd";
import { withRouter } from "react-router";
import FormRegisterHomepage from "./FormRegisterHomepage";
import vietjec from "../../../common/assets/images/vietjet.png";
import jetstar from "../../../common/assets/images/jetstar.png";
import thailion from "../../../common/assets/images/thailion.png";
import hok from "../../../common/assets/images/hok.png";
// import scoot from "../../../common/assets/images/scoot.jpg";
import vietnamairline from "../../../common/assets/images/vietnamairline.png";
// Quốc tế brand
import airasia from "../../../common/assets/images/airasia.png";
import logo1 from "../../../common/assets/images/logo-1.png";
import logo2 from "../../../common/assets/images/logo-2.png";
import logo3 from "../../../common/assets/images/logo-3.png";
import logo4 from "../../../common/assets/images/logo-4.png";
import logo5 from "../../../common/assets/images/logo-5.png";
import logo6 from "../../../common/assets/images/log-6.png";
import logo7 from "../../../common/assets/images/logo-7.jpg";
import logo8 from "../../../common/assets/images/logo-8.png";
import logo9 from "../../../common/assets/images/logo-9.png";
import logo10 from "../../../common/assets/images/logo-10.png";
import logo11 from "../../../common/assets/images/logo-11.png";

class RegisterFlyComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(this.props);
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
          <div className="d-flex flex-wrap container m-auto">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <Card style={{ marginTop: 24, marginBottom: 24 }}>
                <FormRegisterHomepage
                  history={history}
                  paramsRegisterFly={paramsRegisterFly}
                  setParamsRegisterFly={setParamsRegisterFly}
                ></FormRegisterHomepage>
              </Card>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <Card style={{ marginTop: 24, marginBottom: 24, height: 558 }}>
                <Carousel autoplay effect="fade">
                  <div>
                    <img
                      alt=""
                      className="w-100"
                      src="https://res.flynow.vn/Seo/Combo%20Da%20Nang-01.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      className="w-100"
                      src="https://res.flynow.vn/Seo/25-9-01.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      className="w-100"
                      src="https://res.flynow.vn/Seo/gohub.jpg"
                    />
                  </div>
                </Carousel>
              </Card>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#fff", padding: 30, borderRadius: 5 }}
          className=" container-fluid"
        >
          <div className="container">
            <div className="d-flex align-items-center flex-wrap">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <h5 style={{ fontWeight: "bold", fontSize: 24 }}>
                  Đối tác hàng không
                </h5>
              </div>
              <div className="col-xs-12 col-md-8 col-sm-12 d-flex justify-content-between flex-wrap wrap-image">
                <img className="logo-brand" alt="" src={vietjec} />
                <img className="logo-brand" alt="" src={logo5} />
                <img className="logo-brand" alt="" src={jetstar} />
                <img className="logo-brand" alt="" src={thailion} />
                <img className="logo-brand" alt="" src={hok} />
                {/* <img className="logo-brand" alt="" src={scoot} /> */}
                <img className="logo-brand" alt="" src={vietnamairline} />
              </div>
            </div>
            {/* Đối tác hàng không nội địa và quốc tế */}
            <div className="d-flex align-items-center flex-wrap mt-3">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <h6
                  style={{ color: "#8f8f8f", fontWeight: "bold", fontSize: 19 }}
                >
                  Đối tác hàng không nội địa và quốc tế
                </h6>
              </div>
              <div className="col-xs-12 col-md-8 col-sm-12 d-flex justify-content-between flex-wrap wrap-image">
                <img className="logo-brand" alt="" src={airasia} />
                <img className="logo-brand" alt="" src={logo1} />
                <img className="logo-brand" alt="" src={logo2} />
                <img className="logo-brand" alt="" src={logo3} />
                <img className="logo-brand" alt="" src={logo4} />
                <img className="logo-brand" alt="" src={logo5} />
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap mt-3">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <h6 style={{ fontSize: 17 }}>
                  Những đối tác hàng không toàn cầu sẽ chắp cánh đưa bạn đến mọi
                  địa điểm trên thế giới.
                </h6>
              </div>
              <div className="col-xs-12 col-md-8 col-sm-12 d-flex flex-wrap justify-content-between wrap-image">
                <img className="logo-brand" alt="" src={logo11} />
                <img className="logo-brand" alt="" src={logo6} />
                <img className="logo-brand" alt="" src={logo7} />
                <img className="logo-brand" alt="" src={logo8} />
                <img className="logo-brand" alt="" src={logo9} />
                <img className="logo-brand" alt="" src={logo10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterFlyComponent);
