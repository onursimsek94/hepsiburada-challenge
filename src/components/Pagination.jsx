import React from 'react'
import { connect } from 'react-redux'

import { paginationPrevClick, paginationNextClick, paginationPageChange } from 'Actions/paginationActions'

export default class Pagination extends React.Component {
  handlePageChange (page) {
    if (page === 'prev') {
      this.props.dispatch(paginationPrevClick())
    } else if (page === 'next') {
      this.props.dispatch(paginationNextClick())
    } else {
      this.props.dispatch(paginationPageChange(page))
    }
  }

  createPaginationItems (activePage, totalPage, pageChangeFn) {
    let paginationItems = []

    for (let i = 1; i <= totalPage; i++) {
      paginationItems.push(
        <li
          key={`pagination-item-${i}`}
          className={`page-item ${activePage === i ? 'active' : ''}`}
          onClick={() => pageChangeFn(i)}>
          <a
            className='page-link'
            href='javascript:void(0)'>
            {i}
          </a>
        </li>
      )
    }

    return paginationItems
  }

  render () {
    const { activePage, totalPage, pageChangeFn } = this.props

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          <li
            className={`page-item ${activePage === 1 ? 'disabled' : ''}`}
            onClick={() => pageChangeFn('prev')}>
            <a
              className='page-link'
              href='javascript:void(0)'>
              <i className='fa fa-chevron-left' />
            </a>
          </li>
          { this.createPaginationItems(activePage, totalPage, pageChangeFn) }
          <li
            className={`page-item ${activePage === totalPage ? 'disabled' : ''}`}
            onClick={() => pageChangeFn('next')}>
            <a className='page-link' href='javascript:void(0)'>
              <i className='fa fa-chevron-right' />
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
