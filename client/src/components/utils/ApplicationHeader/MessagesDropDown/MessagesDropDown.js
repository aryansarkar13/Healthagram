import React, { Component } from "react";
import DropDown from "components/utils/DropDown/DropDown";
import MessageRequest from "components/utils/ApplicationHeader/MessagesDropDown/MessageRequest/MessageRequest";
import { connect } from "react-redux";
import Icon from "components/utils/Icon/Icon";

class MessagesDropDown extends Component {
  renderMessages = () => {
    if (this.props.profile && this.props.profile.lastMessages.length === 0) {
      //returns all the last messages which are not read

      return (
        <p className="MessagesDropDown__no-message">
          {" "}
          There are no messages to show{" "}
        </p>
      );
    }
    if (this.props.profile && this.props.profile.lastMessages) {
      const unreadMessages = this.totalUnreadMessages(
        this.props.profile.lastMessages
      );
      if (unreadMessages.length === 0) {
        return (
          <p className="MessagesDropDown__no-message">
            There are no messages to show{" "}
          </p>
        );
      }

      //sender can be either  senderName or receiverName
      //Just data is aggregated that way from mongoDB
      return unreadMessages.map((message, i) => {
        let sender = message.body.senderName;
        let receiver = message.body.receiverName;
        return (
          <MessageRequest
            key={i}
            sender={sender}
            receiver={receiver}
            message={message.body.message}
            image={message.body.userImage}
            id={message.body._id}
          />
        );
      });
    }
  };

  totalUnreadMessages = messages => {
    //returns those messages which are not send by us
    //and which are not read
    return messages.filter(
      message =>
        message.body.isRead === false &&
        message.body.senderName !== this.props.profile.username
    );
  };
  render() {
    const { props } = this;
    let unreadMessages = null;
    if (props.profile) {
      unreadMessages = this.totalUnreadMessages(props.profile.lastMessages)
        .length;
    }
    return (
      <div className="MessagesDropDown">
        {unreadMessages !== 0 && (
          <span className="MessagesDropDown__total-notifications">
            {unreadMessages}
          </span>
        )}

        <DropDown
          location="middle"
          displayText={
            <Icon name="chat---messages-icon" color="#FFFFFF" size={27} />
          }
        >
          <div className="MessagesDropDown__dropdown">
            <div className="MessagesDropDown__block-container">
              <h6 className="MessagesDropDown__block-title">Chat/Messages</h6>
              <p className="MessagesDropDown__block-btn">PlaceHolder</p>
            </div>
            <ul className="MessagesDropDown__friend-requests-list">
              {this.renderMessages()}
            </ul>
          </div>
        </DropDown>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps)(MessagesDropDown);
