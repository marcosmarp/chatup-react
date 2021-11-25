import { useState, useEffect, useRef } from 'react'
import CommandInput from './components/CommandInput/CommandInput';
import Header from './components/Header/Header';
import ConsoleOutput from './components/ConsoleOutput/ConsoleOutput';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SuccessMessage from './components/SuccessMessage/SuccessMessage';


function App() {
  const restUri = "http://localhost:5000/api";
  
  const [commands, setCommands] = useState([]);
  const [displayInput, setDisplayInput] = useState(true);
  const [wipeConsole, setWipeConsole] = useState(false);
  const commandInputRef = useRef(null);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    scrollToRef(commandInputRef);
  }, [commands]);

    
  const getSession = async () => {
    const res = await fetch(`${restUri}/session/`, {
      method: "GET",
      headers: {'Content-type': 'application/json'},
      credentials: 'include'
    });
    console.log(await res.json());
  }


  const logIn = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-in/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) {
        if (response.authenticated) return <SuccessMessage message={"Logged in"} />
        else return <ErrorMessage message={"Wrong password"} />;
      }
      else {
        switch (response.error) {
          case "unexistent username":
            return <ErrorMessage message={"Username is not registered, try 'register'"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;

          case "empty password":
            return <ErrorMessage message={"Password can't be empty"} />;
          
          default:
            return <ErrorMessage message={"Internal server error, try again later"} />;
        }
      }
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const createChatroom = async (name, keywords) => {
    try {
      const res = await fetch(`${restUri}/chatrooms/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "name": name,
          "keywords": keywords
        })
      });
      const response = await res.json();
      
      if (response.success) {
        return <SuccessMessage message={"Created chatroom"} />
      }
      else {
        switch (response.error) {
          case "not authenticated":
            return <ErrorMessage message={"You have to log in to create a chatroom"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;
        }
      }
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const logOut = async () => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-out/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
      });
      const response = await res.json();
      if (response.success) return <SuccessMessage message={"Logged out"} />;
      else return <ErrorMessage message={"Internal server error, try again later"} />;
    }
    catch (err) {
      return ({'error': err});
    }
  }

  const registerUser = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/register/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) return <SuccessMessage message={"Registered new user"} />;
      else {
        switch (response.error) {
          case "username taken":
            return <ErrorMessage message={"Username already registered"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;

          case "empty password":
            return <ErrorMessage message={"Password can't be empty"} />;
          
          default:
            return <ErrorMessage message={"Internal server error, try again later"} />;
        }
      }    
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const storeCommand = async (command) => {
    setCommands(commands => {
      return (
        [...commands,
        command]
      );
    });
  }

  if (wipeConsole) {
    setWipeConsole(false);
    setCommands([]);
  };

  const updateDisplayInput = (state) => {
    setDisplayInput(state);
  }

  return (
    <div className='container-fluid'>
      <Header />
      <h6>For available commands, enter :help</h6>
      <ConsoleOutput 
        commands={commands} 
        registerUser={registerUser} 
        setDisplayInput={updateDisplayInput}
        logIn={logIn}
        logOut={logOut}
        setWipeConsole={setWipeConsole}
        restUri={restUri}
        createChatroom={createChatroom}
      />
      {displayInput && <CommandInput onSubmit={storeCommand} commandInputRef={commandInputRef} />}
      <button onClick={getSession} className='btn btn-primary'>SESSION</button>
    </div>
  );
}

export default App;
