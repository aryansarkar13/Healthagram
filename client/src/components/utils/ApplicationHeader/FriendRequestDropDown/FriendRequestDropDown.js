import React, { Component } from "react";
import DropDown from "components/utils/DropDown/DropDown";
import FriendRequest from "components/utils/ApplicationHeader/FriendRequestDropDown/FriendRequest/FriendRequest";
import { connect } from "react-redux";
import Icon from "components/utils/Icon/Icon";
import FriendRequestAccepted from "components/utils/ApplicationHeader/FriendRequestDropDown/FriendRequestAccepted/FriendRequestAccepted";

class FriendRequestDropDown extends Component {
  renderFriendRequest = () => {
    if (this.props.profile && this.props.profile.requests) {
      return this.props.profile.requests.map(request => (
        <FriendRequest
          sender={request.fullname}
          image={request.userImage}
          senderId={request.id}
        />
      ));
    }
  };

  //shows the message you and user are friend with each other
  renderBecomeFriends = () => {
    const friends = this.showUnreadFriendAcceptedMessage();
    return friends.map(friend => (
      <FriendRequestAccepted
        id={friend.friendId._id}
        friendName={friend.friendId.fullname}
        image={friend.friendId.userImage}
      />
    ));
  };

  showUnreadFriendAcceptedMessage = () => {
    if (this.props.profile && this.props.profile.friends) {
      console.log("From friend request drop down", this.props.profile.friends);
      const friends = this.props.profile.friends;
      const profileId = this.props.profile.id;
      //Inside the friends there is an property called readBy
      //which stores all the user Id who have read the notification
      //that they have become friends with user
      //So we are seeing if that is not false
      return friends.filter(friend => {
        let messageNotRead = true;
        if (friend.readBy.length > 0) {
          friend.readBy.map(({ user }) => {
            if (user === profileId) {
              messageNotRead = false;
            }
          });
        }
        return messageNotRead;
      });
    }
  };
  renderNotification = () => {
    if (
      this.props.profile &&
      this.props.profile.requests.length === 0 &&
      this.showUnreadFriendAcceptedMessage().length === 0
    ) {
      return (
        <p className="FriendRequestDropDown__no-friend-message">
          You dont have any friend requests
        </p>
      );
    }
    if (this.props.profile && this.props.profile.friends) {
      return [this.renderBecomeFriends(), this.renderFriendRequest()];
    }
  };
  render() {
    const { props } = this;
    let totalRequest = null;
    if (props.profile) {
      totalRequest =
        props.profile.requests.length +
        this.showUnreadFriendAcceptedMessage().length;
    }
    return (
      <div className="FriendRequestDropDown">
        {totalRequest !== 0 && (
          <span className="FriendRequestDropDown__total-notifications">
            {totalRequest}
          </span>
        )}

        <DropDown
          location="middle"
          displayText={
            <Icon name="happy-face-icon" color="#FFFFFF" size={20} />
          }
        >
          <div className="FriendRequest__dropdown">
            <div className="FriendRequestDropDown__block-container">
              <h6 className="FriendRequestDropDown__block-title">
                FRIEND REQUESTS
              </h6>
              <p className="FriendRequestDropDown__block-btn">PlaceHolder</p>
            </div>
            <ul className="FriendRequestDropDown__friend-requests-list">
              {this.renderNotification()}
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
export default connect(mapStateToProps)(FriendRequestDropDown);
