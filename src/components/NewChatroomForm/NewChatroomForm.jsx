import './new_chatroom_form_style.css'
import { useState, useEffect } from 'react';

const NewChatroomForm = ({ setDisplayInput, onSubmit }) => {

  const [displayKeywords, setDisplayKeywords] = useState(false);
  const [finishTrigger, setFinishTrigger] = useState(false);
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  const onNameSubmit = (key) => {
    if (key === "Enter") setDisplayKeywords(true);
  }

  const onKeywordsSubmit = async (key) => {
    if (key === "Enter") {
      setFinishTrigger(true);
      const response = await onSubmit(name, keywords);
      setServerResponse(response);
    }
  }

  useEffect(()=> {
    setDisplayInput(finishTrigger);
  }, [finishTrigger]);

  return (
    <div id="new_chatroom_form" className='h6'>
      
      <div className="new_chatroom_input_container">
        <span>Name:&nbsp;</span>
        <input 
          type="text"
          autoFocus
          maxLength={100}
          disabled={displayKeywords}
          value={name}
          onChange={(e) => setName(e.target.value)} 
          onKeyDown={(e) => onNameSubmit(e.key)}
        />
      </div>

      {displayKeywords &&
        <div className="new_chatroom_input_container">
          <span>Keywords:&nbsp;</span>
          <input 
            type="text"
            autoFocus
            maxLength={100}
            disabled={finishTrigger}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)} 
            onKeyDown={(e) => onKeywordsSubmit(e.key)}
          />
        </div>
      }
      {displayKeywords && <small>Separated by spaces, this will be used to find your chatroom (example: node nodejs programming)</small>}
      {serverResponse}
    </div>
  )
}

export default NewChatroomForm
