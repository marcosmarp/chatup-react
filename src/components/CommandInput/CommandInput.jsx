import './command_input_style.css';
import { useState } from 'react'

const CommandLine = ({ onSubmit, firstEntry }) => {
  const [command, setCommand] = useState('')
  
  const onKeyPress = (key) => {
    if (key === "Enter") {
      onSubmit(command);
      setCommand('');
    };
  }

  return (
    <div className="h6" id="command_sector">
      {firstEntry === 0 && <h6>For available commands, enter :help</h6>}
      <div id="command_container">
        <span>{`$`}</span>
        <input 
          type="text" 
          id="input_command" 
          value={command} 
          onChange={(e) => setCommand(e.target.value)} 
          onKeyDown={(e) => onKeyPress(e.key)}
          autoComplete='off'
        />
      </div>
    </div>
  )
}

export default CommandLine
