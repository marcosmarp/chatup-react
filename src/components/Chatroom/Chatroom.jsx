import ChatsList from '../ChatsList/ChatsList'
import './chatroom_style.css'
import ChatInput from '../ChatInput/ChatInput'
import { useEffect, useState } from 'react';

const Chatroom = ({ chatroomId, setDisplayInput, restUri }) => {
  setDisplayInput(false);

  const [chatroom, setChatroom] = useState({
    "_id": "",
    "name": "",
    "creator": {},
    "users": [],
    "chats": [],
    "createdAt": "",
    "updatedAt": "",
    "__v": ""
  });

  const fetchChatroom = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${chatroomId}/`, {method: "GET"});
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  useEffect(() => {
    const getChatroom = async () => {
      const res = await fetchChatroom();
      if (res.success) {
        const serverChatroom = res.chatroom;
        setChatroom(serverChatroom);
      }
    }

    getChatroom();
  }, [chatroom]);
  

  return (
    <div id="chatroom_container" className="h6">
      <h5 id='chatroom_title'>"{chatroom.name}" by {chatroom.creator.username}</h5>
      <ChatsList chats={chatroom.chats.slice(-10)} />
      <ChatInput chatroomId={chatroomId} restUri={restUri} setDisplayInput={setDisplayInput}/>
    </div>
  )
}

export default Chatroom
