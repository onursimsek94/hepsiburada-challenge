export function linkNameInputChange (name) {
  return {type: 'LINK_NAME_INPUT_CHANGE', payload: name}
}

export function linkUrlInputChange (url) {
  return {type: 'LINK_URL_INPUT_CHANGE', payload: url}
}

export function addNewLink (newLink) {
  return {type: 'ADD_NEW_LINK', payload: newLink}
}

export function deleteLink (id) {
  return {type: 'DELETE_LINK', payload: id}
}

export function linkVoteUp (id) {
  return {type: 'LINK_VOTE_UP', payload: id}
}

export function linkVoteDown (id) {
  return {type: 'LINK_VOTE_DOWN', payload: id}
}

export function sortLinks () {
  return {type: 'SORT_LINKS'}
}

export function sortSelectChange (value) {
  return {type: 'SORT_SELECT_CHANGE', payload: value}
}
