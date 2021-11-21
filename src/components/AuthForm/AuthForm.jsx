import { useState } from 'react'
import './auth_form_style.css';

const RegisterForm = ({ onSubmit }) => {
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  const [disablePasswordInput, setDisablePasswordInput] = useState(false);
  const [disableUsernameInput, setDisableUsernameInput] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const onUsernameSubmit = (key) => {
    if (key === "Enter") {
      setDisplayPasswordInput(true);
      setDisableUsernameInput(true);
    };
  }
  const onPasswordSubmit = (key) => {
    if (key === "Enter") {
      onSubmit(username, password);
      setDisablePasswordInput(true);
    };
  }
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
    </div>
  )
}

export default RegisterForm
