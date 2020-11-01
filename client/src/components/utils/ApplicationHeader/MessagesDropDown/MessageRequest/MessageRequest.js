import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setMessageAsRead } from "store/actions/privatechat/privatechat";
import Icon from "components/utils/Icon/Icon";

class MessageRequest extends Component {
  redirectToChatPage = () => {
    if (this.props.profile.fullname !== this.props.sender) {
      const chatlink = `/chat/${this.props.sender}.${this.props.receiver}`;
      this.props.history.push(chatlink);
      window.location.reload();
    }
  };

  onClick = async () => {
    await this.props.setMessageAsRead(this.props.id);
    this.redirectToChatPage();
  };
  render() {
    const { props } = this;
    return (
      <li className="MessageRequest" onClick={this.onClick}>
        <div className="MessageRequest__author-thumb">
          <img
            className="MessageRequest__author-image"
            src={props.image}
            alt=""
          />
        </div>
        <div className="MessageRequest__notification-event">
          <p className="MessageRequest__sender-name">{props.sender}</p>
          <p className="MessageRequest__message">{props.message}</p>
        </div>
        <div className="MessageRequest__notification-icon">
          <Icon name="chat---messages-icon" color="#515365" size={23} />
        </div>
      </li>
    );
  }
}

// <div className="MessageRequest__upper-section">
// <p className="MessageRequest__friend-name">{props.sender}</p>
// </div>
// <div className="MessageRequest__lower-section">
// <div className="MessageRequest__message">{props.message}</div>
// </div>
const mapStateToProps = state => ({
  profile: state.profile
});
export default withRouter(
  connect(
    mapStateToProps,
    { setMessageAsRead }
  )(MessageRequest)
);
