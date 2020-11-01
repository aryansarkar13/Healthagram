import React, { Component } from "react";
import { Route } from "react-router-dom";
import Landing from "components/Landing/Landing";
import CreateGroupChat from "components/CreateGroupChat/CreateGroupChat";
import EditGroupChat from "components/EditGroupChat/EditGroupChat";
import GroupChat from "components/GroupChat/GroupChat";
import { connect } from "react-redux";
import {
  fetchUser,
  joinGlobalRoom,
  fetchKeys
} from "store/actions/profile/profile";
import { withRouter, Switch } from "react-router-dom";
import PrivateRoute from "hoc/PrivateRoute";
import PrivateChat from "components/PrivateChat/PrivateChat";
import GroupChatErrorPage from "components/GroupChat/GroupChatErrorPage/GroupChatErrorPage";
import MainProfile from "components/Settings/MainProfile/ManProfile";
import FindPeople from "components/FindPeople/FindPeople";
import ProfilePage from "components/ProfilePage/ProfilePage";
import { joinRequest } from "store/actions/friend/friend";
import NewsFeed from "components/NewsFeed/NewsFeed";
import Chats from "components/Chats/Chats";

class App extends Component {
  state = {
    roomJoined: false
  };
  componentDidMount = async () => {
    try {
      await this.props.fetchUser();
      this.props.fetchKeys();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = () => {
    if (
      this.props.profile &&
      this.props.profile.loggedIn &&
      !this.state.roomJoined
    ) {
      this.joinGlobalRoom();
      this.props.joinRequest(this.props.profile.username);
    }
  };

  joinGlobalRoom = () => {
    const fullname = this.props.profile.fullname;
    const image = this.props.profile.userImage;
    this.props.joinGlobalRoom({
      fullname,
      image
    });
    this.setState({ roomJoined: true });
  };

  //Private Route contains the option of RouteKey
  //If we set it to true component will rerender on query params change
  render() {
    return (
      <div>
        
        <Route exact path="/" component={Landing} />
        <Route exact path="/create-chat-group" component={CreateGroupChat} />
        <Switch>
          <PrivateRoute exact path="/chats" component={Chats} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/home" component={NewsFeed} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/group/error"
            component={GroupChatErrorPage}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/group/:name" component={GroupChat} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/chat/:name"
            component={PrivateChat}
            RouteKey={true}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/findpeople/:searchText"
            component={FindPeople}
            RouteKey={true}
          />
        </Switch>
        <Switch>
          <Route exact path="/profilepage/:id" component={ProfilePage} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/settings/profile"
            component={MainProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/edit-chat-group/:id"
            component={EditGroupChat}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser, joinGlobalRoom, joinRequest, fetchKeys }
  )(App)
);
