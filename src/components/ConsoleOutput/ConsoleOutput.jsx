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

const ConsoleOutput = ({ commands, registerUser, setDisplayInput, logIn, logOut, setWipeConsole, restUri }) => {

  const processCommand = (command) => {
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
      
      case command.match(/^chatrooms search [^\s]+$/)?.input:
        const keyword = command.replace('chatrooms search ', '');
        return <ChatroomList keyword={keyword} restUri={restUri} />;

      /*case command.match(/^chatrooms select \d$/)?.input:
        const selectCode = command.replace('chatrooms select ', '');
        if (selectCode < 0 || selectCode > chatrooms.length-1) return <ErrorMessage message={"Invalid chatroom code, try 'chatroom list'"} />;

        return <Chatroom chatroomId={chatrooms[selectCode]._id} setDisplayInput={setDisplayInput} restUri={restUri} />;*/

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
