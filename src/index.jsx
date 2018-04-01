import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import { Provider } from 'react-redux'

import LinkList from 'Containers/LinkList'
import AddNewLink from 'Containers/AddNewLink'
import store from './store'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../node_modules/font-awesome/css/font-awesome.min.css')
require('./resource/style.css')

require('./resource/hepsiburada-logo.png')

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path='/' component={LinkList} />
        <Route path='/addNewLink' component={AddNewLink} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
