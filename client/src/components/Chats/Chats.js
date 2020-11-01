import React, { Component } from "react";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import ChatGroups from "./ChatGroups/ChatGroups";
import { connect } from "react-redux";
import { fetchGroups } from "store/actions/group/group";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import ManageGroups from "components/Chats/ManageGroups/ManageGroups";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import HomeActionBar from "components/Chats/HomeActionBar/HomeActionBar";
import { updatePageName } from "store/actions/page/page";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";

class Chats extends Component {
  componentDidMount = () => {
    this.props.updatePageName("Chats");
    this.props.fetchGroups();
  };

  render() {
    return (
      <div className="Chats">
        <ApplicationSideNav />
        <ApplicationHeader />
        <LeftMenu />
        <OnlineOfflineFriends />

        {/*Main Content starts here */}
        <ManageGroups />
        <div className="Chats__body">
          <div className="container">
            <HomeActionBar />
            <ChatGroups />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { fetchGroups, updatePageName }
)(Chats);
