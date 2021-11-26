# ChatUp React client

## What's this?
This is the front end client for a chatrooms terminal-like application. It's designed for the [ChatUp REST server](https://github.com/marcosmarp/chatup-rest/) but you can implement it with your own server.
You can find the stable release in the [ChatUp repo](https://github.com/marcosmarp/chatup/) (this one containes both the client and the API)

## What do you mean with *terminal-like*?
The idea of this client is to ressemble the UNIX-based terminals, so we have an input and a commands history on screen:

![image](https://user-images.githubusercontent.com/88422056/143583069-a0004f62-42ba-4098-95c2-d455556c64fe.png)


## License
This project is MIT licensed so use it freely without holding my accountable for his correct functionality.

## Contributions
Just open an issue or a PR, I'm open to anything that improves or adds new features to the project

## Available commands
### `clear`
Clears the screen
### `:help`
Displays the available commands
### `about`
Displays the info of the project
### `log in`
Starts the logging in process
### `log out`
Ends the current user session
### `register`
Starts the new user registration process
### `chatrooms new`
Starts new chatroom creation process
### `chatrooms own`
List your currents active chatrooms
### `chatrooms own select <selectCode>`
Select a chatroom between your chatrooms (to see the select codes, run `chatrooms own`)
### `chatrooms own remove <selectCode>`
Removes a chatroom from your chatrooms (to see the select codes, run `chatrooms own`)
### `chatrooms own delete <selectCode>`
Deletes a chatroom (you have to be the creator to do this) (to see the select codes, run `chatrooms own`)
### `chatrooms search <topic>`
Searchs for chatrooms that matches the specified `<topic>`
### `chatrooms search <topic> select <selectCode>`
Select a chatroom between the chatrooms that matches the specified `<topic>` (to see the select codes, run `chatrooms search topic`)
### *more to come*

