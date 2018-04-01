import React from 'react'

export default class LinkListItems extends React.Component {
  render () {
    const { item, upVoteFn, downVoteFn, deleteLinkFn } = this.props

    return (
      <div className='row justify-content-sm-center'>
        <div className='link-list-item-container'>
          <div className='delete-button'>
            <i
              className='fa fa-minus-circle'
              onClick={() => deleteLinkFn(item)} />
          </div>
          <div className='points-container'>
            <div className='points'>
              {item.points}
            </div>
            <div className='text'>
              POINTS
            </div>
          </div>
          <div className='link-text-container'>
            <div className='text'>
              {item.name}
            </div>
            <div className='link'>
              {`(${item.url})`}
            </div>
          </div>
          <div className='row vote-button-container'>
            <div
              className='col'
              onClick={() => upVoteFn(item)}>
              <i className='fa fa-arrow-up' /> Up Vote
            </div>
            <div
              className='col'
              onClick={() => downVoteFn(item)}>
              <i className='fa fa-arrow-down' /> Down Vote
            </div>
          </div>
        </div>
      </div>
    )
  }
}
