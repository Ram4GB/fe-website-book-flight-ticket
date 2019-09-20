import React, { Component } from 'react'
import Lottie from '../libraries/Lottie'

export class UnderConstruction extends Component {
  render () {
    return (
      <div>
        <Lottie
          options={{
            animationData: require('../assets/8980-order-status-for-food-delivery.json')
          }}
          style={{
            marginBottom: 150
          }}
          width={500}
          height={500}
        />
      </div>
    )
  }
}

export default UnderConstruction
