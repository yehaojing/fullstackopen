import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
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

export default Notification