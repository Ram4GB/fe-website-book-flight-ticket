import React, { Component } from "react";
import Lottie from "../libraries/Lottie";

export class UnderConstruction extends Component {
  componentWillMount() {
    document.title = "FlyNow | ADMIN";
  }
  render() {
    return (
      <div>
        <Lottie
          options={{
            animationData: require("../assets/animations/5371-volaris-tickets")
          }}
          style={{
            marginBottom: 150
          }}
          width={500}
          height={500}
        />
      </div>
    );
  }
}

export default UnderConstruction;
