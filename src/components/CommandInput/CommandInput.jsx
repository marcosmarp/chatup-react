import './command_input_style.css';
import { useState } from 'react'

const CommandLine = ({ onSubmit }) => {
  const [command, setCommand] = useState('');
  const [previousCommand, setPreviousCommand] = useState('');
  
  const onKeyPress = (key) => {
    if (key === "ArrowUp") {
      setCommand(previousCommand);
    }

    if (key === "ArrowDown") {
      setCommand('');
    }

    if (key === "Enter") {
      onSubmit(command);
      setPreviousCommand(command);
      setCommand('');
    };

  }

  return (
    <div className="h6" id="command_sector">
      <div id="command_container">
        <span>{`$`}</span>
        <input 
          type="text" 
          id="input_command" 
          value={command} 
          onChange={(e) => setCommand(e.target.value)} 
          onKeyDown={(e) => onKeyPress(e.key)}
          autoComplete='off'
          autoFocus
        />
      </div>
    </div>
  )
}

export default CommandLine
