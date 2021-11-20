import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatroomList from './components/ChatroomsList/ChatroomList';
import CommandLine from './components/CommandLine/CommandLine';
import Header from './components/Header/Header'

function App() {
  const restUri = "http://localhost:5000/api";

  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const getChatrooms = async () => {
      const serverChatrooms = await fetchChatrooms();
      setChatrooms(serverChatrooms);
    }

    getChatrooms();
  }, [chatrooms]);

  const fetchChatrooms = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/`, {method: "GET"});
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const processCommand = async(command) => {
    console.log(command);
  }

  return (
    <div className='container-fluid'>
      <Header />
      <CommandLine onSubmit={processCommand}/>
    </div>
  );
}

export default App;
