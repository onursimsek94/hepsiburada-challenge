import React from 'react'
import { connect } from 'react-redux'

import { paginationPrevClick, paginationNextClick, paginationPageChange, paginationSetTotalPage } from 'Actions/paginationActions'
import { deleteLink, linkVoteUp, linkVoteDown, sortLinks, sortSelectChange } from 'Actions/linkActions'

import HelperFunctions from 'Resource/HelperFunctions'

import Header from 'Components/Header'
import SubmitLinkButton from 'Components/SubmitLinkButton'
import LinkListItems from 'Components/LinkListItems'
import Pagination from 'Components/Pagination'
import Toastr from 'Components/Toastr'
import Modal from 'react-responsive-modal'

@connect((store) => {
  return {
    pagination: store.pagination,
    link: store.link
  }
})
export default class LinkList extends React.Component {
  constructor () {
    super()

    this.state = {
      modal: {
        open: false,
        item: {}
      }
    }

    this.setTotalPage = this.setTotalPage.bind(this)
    this.handleAddNewLinkClick = this.handleAddNewLinkClick.bind(this)
    this.handleSortSelectChange = this.handleSortSelectChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleDeleteLink = this.handleDeleteLink.bind(this)
    this.handleUpVoteLink = this.handleUpVoteLink.bind(this)
    this.handleDownVoteLink = this.handleDownVoteLink.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  componentDidMount () {
    this.setTotalPage()
    this.props.dispatch(sortLinks())
  }

  setTotalPage () {
    const { link, dispatch } = this.props
    dispatch(paginationSetTotalPage(HelperFunctions.calculateTotalPage(link.links.length)))
  }

  handleDeleteLink () {
    const { modal } = this.state
    this.props.dispatch(deleteLink(modal.item.id))
    this.setTotalPage()
    this.toastr.newNotification(`${modal.item.name.toUpperCase()} removed.`, 'success', 'bc')
    this.onCloseModal()
  }

  handleUpVoteLink (item) {
    const { dispatch } = this.props
    dispatch(linkVoteUp(item.id))
    dispatch(sortLinks())
  }

  handleDownVoteLink (item) {
    const { dispatch } = this.props
    dispatch(linkVoteDown(item.id))
    dispatch(sortLinks())
  }

  handleSortSelectChange (event) {
    const { dispatch } = this.props
    dispatch(sortSelectChange(event.target.value))
    dispatch(sortLinks())
    dispatch(paginationPageChange(1))
  }

  handlePageChange (page) {
    const { dispatch } = this.props
    if (page === 'prev') {
      dispatch(paginationPrevClick())
    } else if (page === 'next') {
      dispatch(paginationNextClick())
    } else {
      dispatch(paginationPageChange(page))
    }
  }

  handleAddNewLinkClick () {
    const { history } = this.props
    history.push('/addNewLink')
  }

  onOpenModal (item) {
    this.setState({
      modal: {
        open: true,
        item
      }
    })
  }

  onCloseModal () {
    this.setState({
      modal: {
        open: false,
        item: {}
      }
    })
  }

  render () {
    const { modal } = this.state
    const { pagination, link } = this.props
    let linkItems

    if (pagination.activePage === 1) {
      linkItems = link.links.slice(0, 5)
    } else {
      let index = (pagination.activePage - 1) * 5
      linkItems = link.links.slice(index, index + 5)
    }

    return (
      <div className='container h-100'>

        <Header />

        <div className='row justify-content-sm-center h-100'>
          <div className='col'>
            <SubmitLinkButton clickFn={this.handleAddNewLinkClick}/>
            <hr className='hr-divider' />
            
            <div className='row justify-content-sm-center order-by-container'>
              <select
                className='form-control'
                value={link.orderBy}
                onChange={this.handleSortSelectChange}>
                <option value='lastAdded'>Last Added</option>
                <option value='mostVoted'>Most Voted</option>
                <option value='lessVoted'>Less Voted</option>
              </select>
            </div>

            {
              linkItems.map(item => (
                <LinkListItems
                  key={item.id}
                  item={item}
                  upVoteFn={this.handleUpVoteLink}
                  downVoteFn={this.handleDownVoteLink}
                  deleteLinkFn={this.onOpenModal}/>
              ))
            }
            
            <Pagination
              activePage={pagination.activePage}
              totalPage={pagination.totalPage}
              pageChangeFn={this.handlePageChange}/>
          </div>
        </div>

        <Toastr ref={component => { this.toastr = component }} />
        <Modal
          little
          open={modal.open}
          onClose={this.onCloseModal}
          styles={{modal: {minWidth: 400}}}>
          <h5>Remove Link</h5>
          <div className='modal-text-container'>
            <div>Do you want to remove:</div>
            <div>{modal.item.name}</div>
          </div>
          <div className='modal-button-container'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.handleDeleteLink}>
              OK
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={this.onCloseModal}>
              CANCEL
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}
