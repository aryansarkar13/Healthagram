import React, { Component } from "react";
import Icon from "components/utils/Icon/Icon";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendFriendRequest } from "store/actions/friend/friend";
import classnames from "classnames";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";

class ControlBlock extends Component {
  redirectToProfile = () => {
    this.props.history.push(`/profile/${this.props.name}`);
  };

  redirectToPrivateChat = () => {
    const receiverName = this.props.friendName;
    const senderName = this.props.profile.username;
    this.props.history.push(`/chat/${receiverName}.${senderName}`);
  };
  onSendRequest = () => {
    if (this.isAlreadyFriend()) {
      return console.log("They are already friends");
    }
    const sender = this.props.profile.fullname;
    const receiver = this.props.friendName;
    const data = {
      sender,
      receiver
    };
    this.props.sendFriendRequest(data);
  };

  isAlreadyFriend = () => {
    console.log("Is Already Friend called");

    //friendId consist of actual friend object
    if (this.props.profile) {
      const friend = this.props.profile.friends.filter(friend => {
        return (friend.friendId._id = this.props.profile.id);
      });
      console.log("From isAlreadyFriend", friend);
      if (friend.length === 0) {
        return false;
      }
      return true;
    }
  };

  hasSentRequest = () => {
    if (this.props.profile) {
      const sentRequestFriends = this.props.profile.sentRequest;
      const friend = sentRequestFriends.filter(
        ({ username }) => username === this.props.friendName
      );
      console.log("From has sent request", friend);
      if (friend.length === 0) {
        return false;
      }
      return true;
    }
  };
  render() {
    const { props } = this;
    const friendRequestBtnClasses = classnames({
      "ProfileSection__control-item": true,
      "ProfileSection__control-item--blue":
        !this.isAlreadyFriend() && !this.hasSentRequest(),
      "ProfileSection__control-item--disabled":
        this.isAlreadyFriend() || this.hasSentRequest()
    });

    let tooltip = "Add Friend";
    if (this.isAlreadyFriend()) {
      tooltip = "Friends";
    }
    if (this.hasSentRequest()) {
      tooltip = "Request sent";
    }
    if (props.profile) {
      if (props.profile.username !== props.friendName) {
        return (
          <div className="ProfileSection__control-block">
            <ReactTooltip />

            <div
              data-tip={tooltip}
              onClick={this.onSendRequest}
              className={friendRequestBtnClasses}
            >
              {" "}
              <Icon name="happy-face-icon" size={20} color="#FFFFFF" />
            </div>

            <div
              data-tip="Chat"
              onClick={this.redirectToPrivateChat}
              className="ProfileSection__control-item ProfileSection__control-item--purple"
            >
              <Icon name="chat---messages-icon" size={20} color="#FFFFFF" />
            </div>
          </div>
        );
      }
    }
    return <div />;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { sendFriendRequest }
  )(ControlBlock)
);
