export function paginationPrevClick () {
  return {type: 'PAGINATION_PREV_CLICK'}
}

export function paginationNextClick () {
  return {type: 'PAGINATION_NEXT_CLICK'}
}

export function paginationPageChange (page) {
  return {type: 'PAGINATION_PAGE_CHANGE', payload: page}
}

export function paginationSetTotalPage (totalPage) {
  return {type: 'PAGINATION_SET_TOTAL_PAGE', payload: totalPage}
}
