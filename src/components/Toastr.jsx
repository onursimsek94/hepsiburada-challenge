import React from 'react'
import NotificationSystem from 'react-notification-system'

export default class Toastr extends React.Component {
  newNotification (message, type, position, event) {
    event && event.preventDefault()
    this.refs.notificationSystem.addNotification({
      message: message,
      level: type,
      position: position
    })
  }

  render () {
    return (
      <div>
        <NotificationSystem ref='notificationSystem' />
      </div>
    )
  }
}
