import React, {Component} from 'react';
import Message from "./Message.jsx";


class MessageList extends Component {

  render() {

    return (
        <div className="messages">
          {this.props.messages.map((message) => {
            return <Message key={message.id} content={message.content} username={message.username} id={message.id} oldName={message.oldName} newName={message.newName} type={message.type} />
          })}
        </div>
    );
  }
}

export default MessageList;