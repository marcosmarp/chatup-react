import { useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './chat_input_style.css'

const ChatInput = ({ restUri, chatroomId, setDisplayInput }) => {
  const [chat, setChat] = useState('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [exitTrigger, setExitTrigger] = useState(false);

  const postChat = async (content) => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${chatroomId}/chats/`, {
        method: "POST",
        'headers': {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({"content": content})
    });
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const onSubmit = async () => {
    setDisplayErrorMessage(false);
    setDisplayLoading(true);
    if (chat != '' && chat != ':exit') {
      const response = await postChat(chat);
      if (!response.success) {
        switch (response.error) {
          case 'not authenticated':
            setErrorMessage("Log in to post a chat!");
            break;
          case 'invalid id':
            setErrorMessage("The chatroom ID isn't properly formatted");
            break;
          case 'invalid chatroom':
            setErrorMessage("This chatroom doesn't exists anymore");
            break;
          case 'empty message':
            setErrorMessage("No, you can't post empty messages");
            break;
          default:
            setErrorMessage("Internal server error, try again later");
            break;
        }
        setDisplayErrorMessage(true);
      }
    }

    if (chat === ':exit') {
      setExitTrigger(true);
    }
    setDisplayLoading(false);
  }
  
  const onKeyPress = (key) => {
    if (key === "Enter") {
      onSubmit();
      setChat('');
    };
  }

  if (exitTrigger) {
    setDisplayInput(true);
  }

  return (
    <div id='chat_input_component_wrapper'>
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
          disabled={exitTrigger}
        />
        {displayLoading && <span className="chat_loader"></span>}
      </div>
      {displayErrorMessage && <ErrorMessage message={errorMessage} />}
      <small>':exit' to leave</small>
    </div>
  )
}

export default ChatInput
