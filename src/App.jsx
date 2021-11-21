import { useState, useEffect } from 'react'
import ChatroomList from './components/ChatroomsList/ChatroomList';
import CommandInput from './components/CommandInput/CommandInput';
import Header from './components/Header/Header'
import ConsoleOutput from './components/ConsoleOutput/ConsoleOutput'
import CommandLine from './components/CommandLine/CommandLine'
import UnknownCommand from './components/UnknownCommand/UnknownCommand';
import CommandsList from './components/CommandsList/CommandsList'
import AuthForm from './components/AuthForm/AuthForm'

function App() {
  const restUri = "http://localhost:5000/api";

  const [chatrooms, setChatrooms] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [displayInput, setDisplayInput] = useState(true);

  useEffect(() => {
    const getChatrooms = async () => {
      const response = await fetchChatrooms();
      if (response.success === true) {
        const serverChatrooms = response.chatrooms;
        setChatrooms(serverChatrooms);
      }
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

  const logIn = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-in/`, {
        method: "POST",
        'headers': {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) {
        if (response.authenticated) {
          setChildrens(childrens => {
            return (
              [...childrens,
              <span>Logged in</span>]
            );
          });
        } else {
          setChildrens(childrens => {
            return (
              [...childrens,
              <span className='text-danger'>Wrong password</span>]
            );
          });
        }
      }
      else {
        switch (response.error) {
          case "unexistent username":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>That username isn't registered, try 'register'</span>]
              );
            });
            break;

          case "empty username":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Username can't be empty</span>]
              );
            });
            break;

          case "empty password":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Password can't be empty</span>]
              );
            });
            break;
          
          default:
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Internal server error, try again later</span>]
              );
            });
            break;
        }
      }
      setDisplayInput(true);
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const logOut = async () => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-out/`, {method: "POST"});
      const response = await res.json();
      if (response.success) {
        setChildrens(childrens => {
          return (
            [...childrens,
            <span>Logged out</span>]
          );
        });
      } else {
        setChildrens(childrens => {
          return (
            [...childrens,
            <span className='text-danger'>Internal server error, try again later</span>]
          );
        });
      }
    }
    catch (err) {
      return ({'error': err});
    }
  }

  const registerUser = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/register/`, {
        method: "POST",
        'headers': {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) {
        setChildrens(childrens => {
          return (
            [...childrens,
            <span>Registed new user</span>]
          );
        });
      }
      else {
        switch (response.error) {
          case "username taken":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Username already registered</span>]
              );
            });
            break;

          case "empty username":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Username can't be empty</span>]
              );
            });
            break;

          case "empty password":
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Password can't be empty</span>]
              );
            });
            break;
          
          default:
            setChildrens(childrens => {
              return (
                [...childrens,
                <span className='text-danger'>Internal server error, try again later</span>]
              );
            });
            break;
        }
      }
      setDisplayInput(true);
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
      case '':
        break;

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

      case 'register':
        setDisplayInput(false);
        setChildrens(childrens => {
          return (
            [...childrens,
            <AuthForm onSubmit={registerUser} />]
          );
        });
        break;
      
      case 'log in':
        setDisplayInput(false);
        setChildrens(childrens => {
          return (
            [...childrens,
            <AuthForm onSubmit={logIn} />]
          );
        });
        break;

      case 'log out':
        logOut();
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
      <h6>For available commands, enter :help</h6>
      <ConsoleOutput childrens={childrens}/>
      {displayInput && <CommandInput onSubmit={processCommand} />}
    </div>
  );
}

export default App;
