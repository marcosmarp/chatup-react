import './chatrooms_list_style.css'
import ChatroomListItem from '../ChatroomListItem/ChatroomListItem'

const ChatroomList = ({ chatrooms }) => {
  chatrooms.sort((a,b) => (a.updatedAt < b.updatedAt) ? 1 : ((b.updatedAt < a.updatedAt) ? -1 : 0))
  return (
    <table id='chatrooms_list'>
      <tr>
        <th>CREATOR</th>
        <th>NAME</th>
        <th>ACTIVE USERS</th>
        <th>LAST ENTRY</th>
        <th>SELECT CODE</th>
      </tr>
      {chatrooms.map((chatroom, index) => (
        <ChatroomListItem chatroom={chatroom} selectCode={index} key={chatroom._id} />
      ))}
    </table>
  )
}

export default ChatroomList
