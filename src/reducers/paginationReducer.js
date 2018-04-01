import { combineReducers } from 'redux'

export default function reducer (state = {
  activePage: 1,
  totalPage: 1
}, action) {
  switch (action.type) {
    case 'PAGINATION_PREV_CLICK':
      return {
        ...state,
        activePage: state.activePage !== 1 ? state.activePage - 1 : state.activePage
      }
    case 'PAGINATION_NEXT_CLICK':
      return {
        ...state,
        activePage: state.activePage !== state.totalPage ? state.activePage + 1 : state.totalPage
      }
    case 'PAGINATION_PAGE_CHANGE':
      return {
        ...state,
        activePage: action.payload
      }
    case 'PAGINATION_SET_TOTAL_PAGE':
      return {
        ...state,
        totalPage: action.payload
      }
    default:
      break
  }

  return state
}
