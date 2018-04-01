import React from 'react'

export default class SubmitLinkButton extends React.Component {
  render () {
    const { clickFn } = this.props

    return (
      <div
        className='row justify-content-sm-center'
        onClick={clickFn}>
        <div className='submit-link-container'>
          <div className='plus'>+</div>
          <div className='text'>SUBMIT A LINK</div>
        </div>
      </div>
    )
  }
}
