import React, { Component } from "react";
import ChatMessage from "components/GroupChat/ChatSection/ChatMessage/ChatMessage";
import SendMessage from "components/GroupChat/ChatSection/SendMessage/SendMessage";

class ChatSection extends Component {
  render() {
    const { props } = this;
    return (
      <div className="ChatSection">
        <div className="ChatSection__header-container">
          <p className="ChatSection__header-container__title">
            {props.groupname}
          </p>
        </div>
        <ChatMessage />
        <SendMessage groupname={props.groupname} />
      </div>
    );
  }
}

export default ChatSection;
