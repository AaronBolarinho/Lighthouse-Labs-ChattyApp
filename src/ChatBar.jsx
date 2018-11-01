import React, {Component} from 'react';

class ChatBar extends Component {

 messageListener = (event) => {

  if(event.key === 'Enter') {

      this.props.addNewMessage(event.target.value);

      event.target.value = "";

  }
};

 usernameListener = (event) => {

  if(event.key === 'Enter') {

      this.props.newUser(event.target.value);

      // event.target.value = "";

  }

}

  render() {
    return (
        <div>
          <footer className="chatbar">
            <input onKeyDown={this.usernameListener} className="chatbar-username" placeholder="Your Name (Optional) *Hit Enter* "/>
            <input onKeyDown={this.messageListener} className="chatbar-message" placeholder="Type a message and hit ENTER" />
          </footer>
        </div>
    );
  }
}
export default ChatBar;