import { useState, useEffect, useRef } from 'react'
import CommandInput from './components/CommandInput/CommandInput';
import Header from './components/Header/Header';
import ConsoleOutput from './components/ConsoleOutput/ConsoleOutput';


function App() {
  const restUri = "http://localhost:5000/api";
  
  const [commands, setCommands] = useState([]);
  const [displayInput, setDisplayInput] = useState(true);
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

  const storeCommand = async (command) => {
    setCommands(commands => {
      return (
        [...commands,
        command]
      );
    });
  }

  const clearScreen = () => setCommands([]);

  return (
    <div className='container-fluid'>
      <Header />
      <h6>For available commands, enter :help</h6>
      <ConsoleOutput 
        commands={commands}
        setDisplayInput={setDisplayInput}
        restUri={restUri}
        clearScreen={clearScreen}
      />
      {displayInput && <CommandInput onSubmit={storeCommand} commandInputRef={commandInputRef} />}
      <button onClick={getSession} className='btn btn-primary'>SESSION</button>
    </div>
  );
}

export default App;
