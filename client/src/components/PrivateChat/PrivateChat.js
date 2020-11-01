import React, { Component } from "react";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import ChatSection from "components/PrivateChat/ChatSection/ChatSection";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  joinPrivateChatRoom,
  fetchPrivateMessages
} from "store/actions/privatechat/privatechat";
import { updatePageName } from "store/actions/page/page";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";

function swap(input, value_1, value_2) {
  const temp = input[value_1];
  input[value_1] = input[value_2];
  input[value_2] = temp;
}

class PrivateChat extends Component {
  state = {
    exist: true,
    //both users in private chat are connected to two rooms

    //room1 is the room the next user is listening
    room1: "",
    //room2 is the room we are listening
    room2: "",
    receiverName: ""
  };

  componentDidMount = () => {
    this.props.updatePageName("Private Chat");
    //paramOne will act as a room one for private chat
    const paramOne = this.props.match.params.name;

    const link = paramOne.split(".");
    const receiverName = link[0];
    this.setState({ receiverName });
    //mutates the position of data in link
    swap(link, 0, 1);

    //paramTwo will act as a room two for private chat
    const paramTwo = link[0] + "." + link[1];

    const params = {
      room1: paramOne,
      room2: paramTwo
    };

    this.setState({
      room1: paramOne,
      room2: paramTwo
    });

    //params.room1 refers to the receiver name
    this.props.fetchPrivateMessages(receiverName);
    this.props.joinPrivateChatRoom(params);
  };

  checkGroupExist = async groupname => {};
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
          <div className="PrivateChat">
            <div className="PrivateChat__bg" />
            <div className="PrivateChat__body-wrapper">
              <div className="container PrivateChat__container">
                <div className="row">
                  <div className="col">
                    <div className="PrivateChat__body">
                      <ChatSection
                        room={this.state.room1}
                        receiverName={this.state.receiverName}
                      />
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
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { joinPrivateChatRoom, fetchPrivateMessages, updatePageName }
  )(PrivateChat)
);
