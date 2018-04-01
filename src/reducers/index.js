import { combineReducers } from 'redux'

import pagination from './paginationReducer'
import link from './linkReducer'

export default combineReducers({
  pagination,
  link
})
