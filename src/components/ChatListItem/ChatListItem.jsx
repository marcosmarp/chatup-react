const ChatListItem = ({ chat }) => {
  return (
    <span className="chat_list_item">
       {chat.creator.username}: {chat.content}
    </span>
  )
}

export default ChatListItem
