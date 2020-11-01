import React, { Component } from "react";
import ChatMessage from "components/PrivateChat/ChatSection/ChatMessage/ChatMessage";
import SendMessage from "components/PrivateChat/ChatSection/SendMessage/SendMessage";

class ChatSection extends Component {
  render() {
    const { props } = this;
    return (
      <div className="PrivateChat__ChatSection">
        <div className="PrivateChat__ChatSection__header-container">
          <p className="PrivateChat__ChatSection__header-container__title">
            {props.receiverName}
          </p>
        </div>
        <ChatMessage />
        <SendMessage room={props.room} groupname={props.groupname} />
      </div>
    );
  }
}

export default ChatSection;
