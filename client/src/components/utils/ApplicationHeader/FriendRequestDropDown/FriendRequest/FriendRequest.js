import React, { Component } from "react";
import {
  acceptFriendRequest,
  rejectFriendRequest
} from "store/actions/friend/friend";
import { connect } from "react-redux";
import Icon from "components/utils/Icon/Icon";

class FriendRequest extends Component {
  onRequestAccept = () => {
    const data = {
      sender: this.props.sender,
      senderId: this.props.senderId
    };
    this.props.acceptFriendRequest(data);
  };

  onRequestReject = () => {
    const data = {
      senderId: this.props.senderId,
      sender: this.props.sender
    };
    this.props.rejectFriendRequest(data);
  };
  render() {
    const { props } = this;
    return (
      <li className="FriendRequest">
        <div className="FriendRequest__author-thumb">
          <img
            className="FriendRequest__author-image"
            src={props.image}
            alt=""
          />
        </div>
        <div className="FriendRequest__notification-event">
          <p className="FriendRequest__sender-name">{props.sender}</p>
          <span className="FriendRequest__sender-info">NEW USER</span>
        </div>
        <div className="FriendRequest__notification-icon">
          <div
            className="FriendRequest__btn FriendRequest__btn--accept"
            onClick={this.onRequestAccept}
          >
            <span>+</span>
            <Icon name="happy-face-icon" color="#fff" size={19} />
          </div>
          <div
            className="FriendRequest__btn FriendRequest__btn--reject"
            onClick={this.onRequestReject}
          >
            <span>-</span>
            <Icon name="happy-face-icon" color="#fff" size={19} />
          </div>
        </div>
      </li>
    );
  }
}

// <div className="FriendRequest__upper-section">
// <p className="FriendRequest__friend-name">{props.sender}</p>
// </div>
// <div className="FriendRequest__lower-section">
// <div className="FriendRequest__image-container">
//   <img className="FriendRequest__image" src={props.image} alt="" />
// </div>
// <div className="FriendRequest__button-container">
//   <button
//     className="FriendRequest__accept-btn"
//     onClick={this.onRequestAccept}
//   >
//     Accept
//   </button>
//   <button
//     onClick={this.onRequestReject}
//     className="FriendRequest__reject-btn"
//   >
//     Reject
//   </button>
// </div>
// </div>
export default connect(
  null,
  { acceptFriendRequest, rejectFriendRequest }
)(FriendRequest);
