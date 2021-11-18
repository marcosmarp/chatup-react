const ChatroomListItem = ({ chatroom }) => {
  return (
    <tr>
      <td>{chatroom.creator}</td>
      <td>{chatroom.name}</td>
      <td>{chatroom.users.length}</td>
      <td>Today</td>
    </tr>
  )
}

export default ChatroomListItem
