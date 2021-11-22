import ChatListItem from "../ChatListItem/ChatListItem"

const ChatsList = ({ chats }) => {
  return (
    <div id="chats_container">
      {chats.map((chat, index) => (
        <ChatListItem chat={chat} key={chat._id} />
      ))}
    </div>
  )
}

export default ChatsList
