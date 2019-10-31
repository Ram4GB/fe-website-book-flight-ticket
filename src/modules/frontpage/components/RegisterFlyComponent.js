import React, { Component } from "react";
import background from "../../../common/assets/images/wall1.png";
import Slider from "react-slick";
import { Card } from "antd";
import { withRouter } from "react-router";
import FormRegisterHomepage from "./FormRegisterHomepage";

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
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 1000,
      dots: true
    };
    // console.log(this.props.paramsRegisterFly);
    const { paramsRegisterFly, history, setParamsRegisterFly } = this.props;
    return (
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
              <Slider {...settings}>
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
              </Slider>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterFlyComponent);
