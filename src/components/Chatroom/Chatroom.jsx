import ChatsList from '../ChatsList/ChatsList'
import './chatroom_style.css'
import ChatInput from '../ChatInput/ChatInput'

const Chatroom = ({chatroom}) => {
  return (
    <div id="chatroom_container" className="h6">
      <h5 id='chatroom_title'>"{chatroom.name}" by {chatroom.creator.username}</h5>
      <ChatsList chats={chatroom.chats} />
      <ChatInput />
    </div>
  )
}

export default Chatroom
