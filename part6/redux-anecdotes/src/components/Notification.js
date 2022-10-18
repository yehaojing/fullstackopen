import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notification

  const nullNotificationStyle = {
    border: 'solid',
    padding: 0,
    borderWidth: 0
  }
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const style = notification ? notificationStyle : nullNotificationStyle
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification