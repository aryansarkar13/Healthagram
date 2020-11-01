import React, { Component } from "react";
import { connect } from "react-redux";
import OnlineFriend from "components/utils/Chat/OnlineOfflineFriends/OnlineFriend/OnlineFriend";
import OfflineFriend from "components/utils/Chat/OnlineOfflineFriends/OfflineFriend/OfflineFriend";
import Icon from "components/utils/Icon/Icon";

import _ from "lodash";

class OnlineFriends extends Component {
  renderOnlineOfflineFriends = () => {
    if (this.props.profile && this.props.profile.onlineFriends) {
      const friends = this.props.profile.friends;
      const onlineFriends = this.props.profile.onlineFriends;
      return friends.map(({ friendId }) => {
        //friendId is actually the main model of friend user
        //Checks to see if friendId object exist in
        //onlineFriends array
        const isOnline =
          _.findIndex(onlineFriends, o => {
            return _.isMatch(o, friendId);
          }) > -1;

        if (isOnline) {
          return (
            <OnlineFriend
              image={friendId.userImage}
              name={friendId.fullname}
              username={this.props.profile.fullname}
            />
          );
        } else {
          return (
            <OfflineFriend
              image={friendId.userImage}
              name={friendId.fullname}
              username={this.props.profile.fullname}
            />
          );
        }
      });
    }
  };
  render() {
    let onlineFriends = null;
    if (this.props.profile && this.props.profile.onlineFriends) {
      onlineFriends = this.props.profile.onlineFriends.length;
    }
    return (
      <div className="OnlineOfflineFriends">
        <ul className="ChatUser">{this.renderOnlineOfflineFriends()}</ul>
        <div className="OnlineOfflineFriends__chat-icon">
          {" "}
          <Icon name="chat---messages-icon" color="#FFFFFF" size={30} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(OnlineFriends);
