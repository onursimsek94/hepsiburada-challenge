import { combineReducers } from 'redux'
import HelperFunctions from 'Resource/HelperFunctions'

export default function reducer (state = {
  links: HelperFunctions.getLinkListFromLocalStorage(),
  orderBy: 'lastAdded',
  linkName: '',
  linkUrl: ''
}, action) {
  let tempVariable = null
  switch (action.type) {
    case 'LINK_NAME_INPUT_CHANGE':
      return {
        ...state,
        linkName: action.payload
      }
    case 'LINK_URL_INPUT_CHANGE':
      return {
        ...state,
        linkUrl: action.payload
      }
    case 'ADD_NEW_LINK':
      tempVariable = [...state.links]
      tempVariable.push(action.payload)
      HelperFunctions.setLinkListToLocalStorage(tempVariable)

      return {
        ...state,
        links: tempVariable
      }
    case 'DELETE_LINK':
      tempVariable = [...state.links]
      tempVariable = tempVariable.filter(item => item.id !== action.payload)
      HelperFunctions.setLinkListToLocalStorage(tempVariable)

      return {
        ...state,
        links: tempVariable
      }
    case 'LINK_VOTE_UP':
      tempVariable = [...state.links]
      tempVariable.find(item => {
        if (item.id === action.payload) {
          item.points++
          item.modifiedDate = new Date().getTime()
          return true
        }
      })
      HelperFunctions.setLinkListToLocalStorage(tempVariable)

      return {
        ...state,
        links: tempVariable
      }
    case 'LINK_VOTE_DOWN':
      tempVariable = [...state.links]
      tempVariable.find(item => {
        if (item.id === action.payload) {
          item.points--
          item.modifiedDate = new Date().getTime()
          return true
        }
      })
      HelperFunctions.setLinkListToLocalStorage(tempVariable)

      return {
        ...state,
        links: tempVariable
      }
    case 'SORT_LINKS':
      tempVariable = [...state.links]
      tempVariable.sort((a, b) => {
        if (state.orderBy === 'lastAdded') {
          return b.id - a.id
        } else if (state.orderBy === 'lessVoted') {
          return a.points - b.points
        } else {
          return b.points - a.points
        }
      })

      if (state.orderBy === 'lessVoted' || state.orderBy === 'mostVoted') {
        tempVariable.sort((a, b) => {
          if (a.points === b.points) {
            return b.modifiedDate - a.modifiedDate
          }
        })
      }

      return {
        ...state,
        links: tempVariable
      }
    case 'SORT_SELECT_CHANGE':
      return {
        ...state,
        orderBy: action.payload
      }
    default:
      break
  }

  return state
}
