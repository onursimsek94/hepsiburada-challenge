import React from 'react'

export default class Header extends React.Component {
  render () {
    return (
      <div className='header'>
        <div className='row align-items-end'>

          <div className='col'>
            <img
              src='public/hepsiburada-logo.png'
              className='header-logo float-left' />
          </div>

          <div className='col'>
            <div className='float-right header-text'>
              <b>Link</b>VOTE Challenge
            </div>
          </div>

        </div>
      </div>
    )
  }
}
