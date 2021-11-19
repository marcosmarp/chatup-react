import './command_line_style.css';

const CommandLine = () => {
  return (
    <div className="h6" id="command_sector">
      <span>For available commands, enter :help</span>
      <div id="command_container">
        <span>{'>'}</span>
        <input type="text" id="input_command"/>
      </div>
      
    </div>
  )
}

export default CommandLine
