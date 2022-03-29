const Notification = ({ message, state }) => {
  return (
    <div className={state}>
      {message}
    </div>
  )
}

export default Notification
