import './chatrooms_list_style.css'
import ChatroomListItem from '../ChatroomListItem/ChatroomListItem';
import { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const ChatroomList = ({ keyword, restUri }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [allowErrorMessage, setAllowErrorMessage] = useState(false);
  const [allowChatroomListLoader, setAllowChatroomListLoader] = useState(true);

  const fetchChatrooms = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${keyword}/`, {
        method: "GET",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
      });
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  useEffect(() => {
    const getChatrooms = async () => {
      const response = await fetchChatrooms();
      if (response.success) {
        setAllowErrorMessage(true);
        setAllowChatroomListLoader(false);
        const serverChatrooms = response.chatrooms;
        setChatrooms(serverChatrooms);
      }
    }

    getChatrooms();
  }, [chatrooms]);
  
  //chatrooms.sort((a,b) => (a.activeUsers < b.activeUsers) ? 1 : ((b.activeUsers < a.activeUsers) ? -1 : 0));

  return (
    <>
      {(chatrooms.length) ?
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
        : allowChatroomListLoader && <Loader />
      }
      {(!chatrooms.length && allowErrorMessage) && <ErrorMessage message={"No matches for your search"} />}
    </>  
  )
}

export default ChatroomList
