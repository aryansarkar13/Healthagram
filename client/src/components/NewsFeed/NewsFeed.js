import React, { Component } from "react";
import ApplicationHeader from "../utils/ApplicationHeader/ApplicationHeader";
import ApplicationSideNav from "../utils/ApplicationSideNav/ApplicationSideNav";
import OnlineOfflineFriends from "../utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import LeftMenu from "../utils/LeftMenu/LeftMenu";
import NewsFeedForm from "./NewsFeedForm/NewsFeedForm";
import PostCard from "../utils/PostCard/PostCard";
import InfiniteNewsFeed from "./InfiniteNewsFeed/InfiniteNewsFeed";
import { connect } from "react-redux";

class NewsFeed extends Component {
  render() {
    return (
      <div>
        <ApplicationSideNav />
        <ApplicationHeader />
        <OnlineOfflineFriends />
        <LeftMenu />
        <div className="NewsFeed">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <NewsFeedForm />
                <InfiniteNewsFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null)(NewsFeed);
