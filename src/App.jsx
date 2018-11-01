import React, {Component} from 'react';

import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

const uuidv4 = require('uuid/v4');

class App extends Component {

  constructor() {

    super();

    this.state = {

      currentUser: {name: "Bob"}, // optional. if currentUser !defined, user is Anonymous

      messages: [], // messages coming from the server will be stored here as they arrive

      currentOnline: {num: 0},
    };
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);

  this.newSocket = new WebSocket("ws://localhost:3001/");
  console.log("connected to the server");

    this.newSocket.onmessage = (event) => {

    console.log(event);

    const data = JSON.parse(event.data);

    switch(data.type) {

      case "incomingMessage":

        const newMessages = [
          ...this.state.messages,
          data
        ];

        this.setState({ messages: newMessages });

        break;

      case "incomingNotification":

        this.setState((oldState) => {
          return { messages: [...oldState.messages, data] };
        })

        break;

        case "userCount":

        this.setState((oldState) => {
          return { currentOnline: data };
        })

        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  };

}

  newUser = (usernameChange) => {

  let uniqueId = uuidv4();

  let newUserName = {
    type: "postNotification",
    id: uniqueId,
    oldName: this.state.currentUser.name,
    newName: usernameChange,
  }

  let newCurrentUser = {
    name: usernameChange,
  }

  this.setState({ currentUser: newCurrentUser });

  this.newSocket.send(JSON.stringify(newUserName));

};

addNewMessage = (messageContent) => {

  let uniqueId = uuidv4();

  const newMessage ={
        type: "postMessage",
        username: this.state.currentUser.name,
        content: messageContent,
        id: uniqueId }

    this.newSocket.send(JSON.stringify(newMessage));

  }

  render() {

    return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="navbar-user"> {this.state.currentOnline.num} Users Online</span>
          </nav>
          <main className="messages">
            <MessageList messages={this.state.messages}/>
          </main>
          <ChatBar currentUser={this.state.currentUser.name} messages={this.state.messages} addNewMessage={this.addNewMessage} newUser={this.newUser}/>
        </div>
    );
  }
}

export default App;
