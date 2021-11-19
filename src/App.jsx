import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatroomList from './components/ChatroomsList/ChatroomList';

function App() {
  const restUri = "http://localhost:5000/api";

  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const getChatrooms = async () => {
      const serverChatrooms = await fetchChatrooms();
      setChatrooms(serverChatrooms);
    }

    getChatrooms();
  }, []);

  const fetchChatrooms = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/`, {method: "GET"});
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  return (
    <div className='container-fluid'>
      <Routes>
        <Route path="/" element={<ChatroomList chatrooms={chatrooms} />}></Route>
        <Route path="/chatrooms/new-chatroom/"></Route>
      </Routes>
    </div>
  );
}

export default App;
