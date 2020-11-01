import React, { Component } from "react";
import { acceptFriendRequestRead } from "store/actions/friend/friend";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Icon from "components/utils/Icon/Icon";

class FriendRequestAccepted extends Component {
  readFriendRequestAccept = () => {
    //sets the readBy property in model as read. so user no longer will be notified
    //request has been accepted
    //Id of the friend
    const id = this.props.id;
    this.props.acceptFriendRequestRead(id);
  };

  onViewProfileClick = () => {
    const id = this.props.id;
    this.props.history.push(`/profilepage/${id}`);
  };
  render() {
    const { props } = this;
    return (
      <li
        className="FriendRequestAccepted"
        onClick={this.readFriendRequestAccept}
      >
        <div className="FriendRequestAccepted__author-thumb">
          <img
            className="FriendRequestAccepted__author-image"
            src={props.image}
            alt=""
          />
        </div>
        <div className="FriendRequestAccepted__notification-event">
          <p
            className="FriendRequestAccepted__message"
            onClick={this.onViewProfileClick}
          >
            <strong>You</strong> and {props.friendName} are now friends with
            each other
          </p>
        </div>
      </li>
    );
  }
}

export default withRouter(
  connect(
    null,
    { acceptFriendRequestRead }
  )(FriendRequestAccepted)
);
