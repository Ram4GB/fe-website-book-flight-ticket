import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './common/styles/CardFood.css'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { createHashHistory } from 'history'
import rootReducer from './modules/index'
import Root from './common/hocs/Root'
import 'antd/dist/antd.css'
import './common/styles/grid.css'

const store = createStore(rootReducer)
const history = createHashHistory()

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
