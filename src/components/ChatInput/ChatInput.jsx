import { useState } from 'react'
import './chat_input_style.css'

const ChatInput = () => {
  const [chat, setChat] = useState('');
  
  const onKeyPress = (key) => {
    if (key === "Enter") {

      setChat('');
    };
  }
  return (
    <div id="chat_input_container">
      <span>{`>`}</span>
      <input 
        type="text" 
        id="chat_input" 
        value={chat} 
        onChange={(e) => setChat(e.target.value)} 
        onKeyDown={(e) => onKeyPress(e.key)}
        autoComplete='off'
        autoFocus
      />
    </div>
  )
}

export default ChatInput
