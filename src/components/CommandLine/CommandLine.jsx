import './command_line_style.css';
import { useState } from 'react'

const CommandLine = ({ onSubmit }) => {
  const [command, setCommand] = useState('')
  
  const onKeyPress = (key) => {
    if (key === "Enter") onSubmit(command);
  }

  return (
    <div className="h6" id="command_sector">
      <span>For available commands, enter :help</span>
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
