import { useState, useEffect } from 'react'
import ChatroomList from './components/ChatroomsList/ChatroomList';
import CommandInput from './components/CommandInput/CommandInput';
import Header from './components/Header/Header'
import ConsoleOutput from './components/ConsoleOutput/ConsoleOutput'
import CommandLine from './components/CommandLine/CommandLine'
import UnknownCommand from './components/UnknownCommand/UnknownCommand';
import CommandsList from './components/CommandsList/CommandsList'

function App() {
  const restUri = "http://localhost:5000/api";

  const [chatrooms, setChatrooms] = useState([]);
  const [childrens, setChildrens] = useState([]);

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

  const processCommand = async (command) => {
    setChildrens(childrens => {
      return (
        [...childrens,
        <CommandLine value={command} />]
      );
    });
    switch(command) {
      case 'clear':
        setChildrens([]);
        break;

      case ':help':
        setChildrens(childrens => {
          return (
            [...childrens,
            <CommandsList />]
          );
        });
        break;
      
      case 'chatrooms list':
        setChildrens(childrens => {
          return (
            [...childrens,
            <ChatroomList chatrooms={chatrooms} />]
          );
        });
        break;

      default:
        setChildrens(childrens => {
          return (
            [...childrens,
            <UnknownCommand command={command} />]
          );
        });
    }
  }

  return (
    <div className='container-fluid'>
      <Header />
      <ConsoleOutput childrens={childrens}/>
      <CommandInput onSubmit={processCommand} firstEntry={childrens.length}/>
    </div>
  );
}

export default App;
