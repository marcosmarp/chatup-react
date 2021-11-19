const ChatroomListItem = ({ chatroom }) => {
  return (
    <tr>
      <td>{chatroom.creator.username}</td>
      <td>{chatroom.name}</td>
      <td>{chatroom.users.length}</td>
      <td>{chatroom.updatedAt.substring(11, 16)}</td>
    </tr>
  )
}

export default ChatroomListItem
