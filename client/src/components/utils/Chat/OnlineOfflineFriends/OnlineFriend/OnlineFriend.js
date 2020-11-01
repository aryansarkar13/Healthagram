import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class OnlineFriend extends Component {
  redirectToPrivateChat = () => {
    //props.name refers to the online friend
    //props.fullname refers to active user name
    const receiverName = this.props.name;
    const senderName = this.props.username;
    this.props.history.push(`/chat/${receiverName}.${senderName}`);
  };

  //.ChatUser__author-thumb is defined on parent
  render() {
    const { props } = this;

    return (
      <li
        onClick={this.redirectToPrivateChat}
        className="ChatUser__user ChatUser__online"
      >
        <div className="ChatUser__author-thumb">
          <img className="ChatUser__image" src={props.image} alt="" />
          <span className="icon-status icon-status--online" />
        </div>
      </li>
    );
  }
}

export default withRouter(OnlineFriend);
