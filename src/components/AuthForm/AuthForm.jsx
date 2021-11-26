import { useState, useEffect } from 'react'
import './auth_form_style.css';

const AuthForm = ({ onSubmit, setDisplayInput }) => {
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  const [disablePasswordInput, setDisablePasswordInput] = useState(false);
  const [disableUsernameInput, setDisableUsernameInput] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  
  const onUsernameSubmit = (key) => {
    if (key === "Enter") {
      setDisplayPasswordInput(true);
      setDisableUsernameInput(true);
    };
  }
  const onPasswordSubmit = async (key) => {
    if (key === "Enter") {
      const response = await onSubmit(username, password);
      setServerResponse(response);
      setDisablePasswordInput(true);
    };
  }

  useEffect(() => {
    setDisplayInput(disablePasswordInput);
  }, [disablePasswordInput]);

  return (
    <div className="h6" id='registration_form'>
      <div className="form_username">
        <span>Username:&nbsp;</span>
        <input 
        type="text" 
        className="auth_input" 
        autoFocus 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        onKeyDown={(e) => onUsernameSubmit(e.key)}
        disabled={disableUsernameInput}
        />
      </div>
      {displayPasswordInput && 
        <div className="form_password">
          <span>Password:&nbsp;</span>
          <input 
            type="password" 
            className="auth_input" 
            autoFocus 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            onKeyDown={(e) => onPasswordSubmit(e.key)}
            disabled={disablePasswordInput}
          />
        </div>
      }
      {serverResponse}
    </div>
  )
}

export default AuthForm
