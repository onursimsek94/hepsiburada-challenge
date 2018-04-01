import React from 'react'
import { connect } from 'react-redux'

import { linkNameInputChange, linkUrlInputChange, addNewLink, sortLinks } from 'Actions/linkActions'
import { paginationPageChange, paginationSetTotalPage } from 'Actions/paginationActions'

import HelperFunctions from 'Resource/HelperFunctions'

import Header from 'Components/Header'
import SubmitLinkButton from 'Components/SubmitLinkButton'
import LinkListItems from 'Components/LinkListItems'
import Toastr from 'Components/Toastr'

@connect((store) => {
  return {
    link: store.link
  }
})
export default class AddNewLink extends React.Component {
  constructor () {
    super()

    this.setTotalPage = this.setTotalPage.bind(this)
    this.handleReturnToList = this.handleReturnToList.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
    this.checkInputFields = this.checkInputFields.bind(this)
    this.clearInputFields = this.clearInputFields.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleReturnToList () {
    const { history, dispatch } = this.props
    dispatch(paginationPageChange(1))
    this.clearInputFields()
    history.push('/')
  }

  setTotalPage () {
    const { link, dispatch } = this.props
    dispatch(paginationSetTotalPage(HelperFunctions.calculateTotalPage(link.links.length)))
  }

  handleInputChange (event) {
    const { dispatch } = this.props
    const changedInput = event.target

    if (changedInput.name === 'linkName') {
      dispatch(linkNameInputChange(changedInput.value))
    } else {
      dispatch(linkUrlInputChange(changedInput.value))
    }
  }

  handleInputKeyPress (event) {
    if (event.which === 13 || event.keyCode === 13) {
      this.handleAddClick()
    }
  }

  checkInputFields () {
    const { link } = this.props

    if (link.linkName.trim() === '' || link.linkUrl.trim() === '') {
      this.toastr.newNotification('Link Name and Link URL fields are required', 'error', 'bc')
      return false
    }

    return true
  }

  clearInputFields () {
    const { dispatch } = this.props

    dispatch(linkNameInputChange(''))
    dispatch(linkUrlInputChange(''))
  }

  handleAddClick () {
    const { link, dispatch } = this.props
    
    if (this.checkInputFields()) {
      dispatch(addNewLink({
        id: new Date().getTime(),
        name: link.linkName,
        url: link.linkUrl,
        points: 0,
        modifiedDate: new Date().getTime()
      }))
      this.toastr.newNotification(`${link.linkName.toUpperCase()} added.`, 'success', 'bc')
      this.clearInputFields()
      this.setTotalPage()
      dispatch(sortLinks())
      document.getElementById('inputLinkName').focus()
    }
  }

  render () {
    const { link } = this.props

    return (
      <div className='container h-100'>

        <Header />

        <div className='row justify-content-sm-center h-100'>
          <div className='col'>
            <div className='row justify-content-sm-center'>
              <div
                className='return-to-list'
                onClick={this.handleReturnToList}>
                <i className='fa fa-long-arrow-left' />
                <div>&nbsp;&nbsp;Return to List</div>
              </div>
            </div>

            <div className='row justify-content-sm-center'>
              <div className='add-new-link-text'>Add New Link</div>
            </div>

            <div className='row justify-content-sm-center add-new-link-container'>
              <form>
                <div className='form-group'>
                  <label htmlFor='inputLinkName'>Link Name:</label>
                  <input
                    type='text'
                    name='linkName'
                    className='form-control'
                    id='inputLinkName'
                    placeholder='e.g. Alphabet'
                    value={link.linkName}
                    onKeyPress={this.handleInputKeyPress}
                    onChange={this.handleInputChange} />
                </div>

                <div className='form-group'>
                  <label htmlFor='inputLinkUrl'>Link URL:</label>
                  <input
                    type='text'
                    name='linkUrl'
                    className='form-control'
                    id='inputLinkUrl'
                    placeholder='e.g. http://abc.xyz'
                    value={link.linkUrl}
                    onKeyPress={this.handleInputKeyPress}
                    onChange={this.handleInputChange} />
                </div>

                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={this.handleAddClick}>
                  ADD
                </button>
              </form>
            </div>

          </div>
        </div>

        <Toastr ref={component => { this.toastr = component }} />
      </div>
    )
  }
}
