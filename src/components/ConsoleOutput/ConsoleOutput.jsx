import './console_output_style.css'
import UnknownCommand from '../UnknownCommand/UnknownCommand';
import CommandsList from '../CommandsList/CommandsList'
import AuthForm from '../AuthForm/AuthForm'
import Chatroom from '../Chatroom/Chatroom';
import ChatroomList from '../ChatroomsList/ChatroomList';
import CommandLine from '../CommandLine/CommandLine'
import LogOut from '../LogOut/LogOut';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import NewChatroomForm from '../NewChatroomForm/NewChatroomForm';

const ConsoleOutput = ({ commands, registerUser, setDisplayInput, logIn, logOut, setWipeConsole, restUri, createChatroom }) => {
  const processCommand = (command) => {
    var keyword;
    switch(command) {
      case '':
        break;

      case 'clear':
        setWipeConsole(true);
        break;

      case ':help':
        return <CommandsList />;

      case 'register':
        return <AuthForm onSubmit={registerUser} setDisplayInput={setDisplayInput} />;
      
      case 'log in':
        return <AuthForm onSubmit={logIn} setDisplayInput={setDisplayInput} />;

      case 'log out':
        return <LogOut logOut={logOut} />;

      case 'chatrooms new':
        return <NewChatroomForm setDisplayInput={setDisplayInput} onSubmit={createChatroom}/>
      
      case command.match(/^chatrooms search [^\s]+$/)?.input:
        keyword = command.replace(/^chatrooms search /, '');
        return <ChatroomList keyword={keyword} restUri={restUri} />;

      case command.match(/^chatrooms search [^\s]+ select \d$/)?.input:
        keyword = command.replace(/^chatrooms search /, '').replace(/ select \d$/, '');
        const selectCode = command.replace(/^chatrooms search [^\s]+ select /, '');
        return <Chatroom keyword={keyword} selectCode={selectCode} setDisplayInput={setDisplayInput} restUri={restUri} />;

      default:
        return <UnknownCommand command={command} />;
    }
  }

  return (
    <div id="previous_commands_container">
      {commands.map((command, index) => (
        <span key={index}>
          <CommandLine value={command} />
          {processCommand(command)}
        </span>))}
    </div>
  )
}

export default ConsoleOutput
