import { slide as Menu } from "react-burger-menu";

import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "store/actions/profile/profile";

const styles = {
  bmBurgerBars: {
    background: "#fff",
    height: "3px"
  },
  bmBurgerButton: {
    top: "11px"
  }
};

class ApplicationSideNav extends Component {
  redirectToHome = () => {
    this.props.history.push("/home");
  };

  redirectToSettings = () => {
    this.props.history.push("/settings/profile");
  };

  onLogoutClick = () => {
    const history = this.props.history;
    this.props.logoutUser(history);
  };

  onCreateChatGroup = () => {
    this.props.history.push("/create-chat-group");
  };
  render() {
    return (
      <Menu styles={styles} className="ApplicationSideNav">
        <div
          id="campaigns"
          className="bm-item-list"
          onClick={this.redirectToHome}
        >
          Home
        </div>
        <div
          id="templates"
          className="bm-item-list"
          onClick={this.redirectToSettings}
        >
          Settings
        </div>
        <div
          id="templates"
          className="bm-item-list"
          onClick={this.onCreateChatGroup}
        >
          Create Chat Group
        </div>
        <div
          id="templates"
          className="bm-item-list"
          onClick={this.onLogoutClick}
        >
          LogOut
        </div>
      </Menu>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logoutUser }
  )(withRouter(ApplicationSideNav))
);
