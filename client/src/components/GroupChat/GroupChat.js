import React, { Component } from "react";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import ChatSection from "components/GroupChat/ChatSection/ChatSection";
import OnlineGroupMembers from "components/GroupChat/OnlineGroupMembers/OnlineGroupMembers";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  joinRoom,
  updateGroupName,
  fetchGroupChatMessage,
  leaveRoom
} from "store/actions/groupchat/groupchat";
import { joinRequest } from "store/actions/friend/friend";
import { updatePageName } from "store/actions/page/page";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";

class GroupChat extends Component {
  state = {
    exist: false
  };
  componentDidMount = async () => {
    this.props.updatePageName("Group Chat");
    const groupname = this.props.match.params.name;

    //Check if the group name is valid
    //redirects the user to error page if it is invalid group name
    this.checkGroupExist(groupname);

    this.props.updateGroupName(groupname);
    const params = {
      room: groupname,
      name: this.props.profile.fullname,
      userId: this.props.profile.id,
      image: this.props.profile.userImage
    };

    console.log("Component did mount of group chat", params);
    // Joins the room and stores the user information in server
    // to keep track of online users in particular group
    await this.props.fetchGroupChatMessage(groupname);
    this.props.joinRoom(params);
  };

  checkGroupExist = async groupname => {
    try {
      await axios.get(`/api/get-group/${groupname}`);
      this.setState({ exist: true });
    } catch (err) {
      this.props.history.push("/group/error");
    }
  };

  componentWillUnmount = () => {
    const groupname = this.props.match.params.name;
    const params = {
      room: groupname,
      name: this.props.profile.fullname
    };
    this.props.leaveRoom(params);
  };
  render() {
    const { props } = this;
    let render = null;
    if (this.state.exist) {
      render = (
        <div>
          <ApplicationSideNav />
          <ApplicationHeader />
          <OnlineOfflineFriends />
          <LeftMenu />
          <div className="GroupChat">
            <div className="GroupChat__bg" />
            <div className="GroupChat__body-wrapper">
              <div className="container GroupChat__container">
                <div className="row">
                  <div className="col">
                    <div className="GroupChat__body">
                      <OnlineGroupMembers />
                      <ChatSection groupname={this.props.groupname} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return render;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  groupname: state.groupchat.groupname
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      joinRoom,
      joinRequest,
      updateGroupName,
      fetchGroupChatMessage,
      updatePageName,
      leaveRoom
    }
  )(GroupChat)
);
