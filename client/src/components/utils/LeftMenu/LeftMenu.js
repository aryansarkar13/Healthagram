import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LeftMenu extends Component {
  onClickHome = () => {
    this.props.history.push("/home");
  };

  onClickSettings = () => {
    this.props.history.push("/settings/profile");
  };

  onClickChat = () => {
    this.props.history.push("/chats");
  };
  render() {
    return (
      <div className="LeftMenu">
        <ul className="LeftMenu__lists">
          <li className="LeftMenu__lists__list-item" onClick={this.onClickHome}>
            <i class="fas fa-home" />
          </li>
          <li className="LeftMenu__lists__list-item" onClick={this.onClickChat}>
            <i class="fas fa-comments" />
          </li>
          <li
            className="LeftMenu__lists__list-item"
            onClick={this.onClickSettings}
          >
            <i class="fas fa-cog" />
          </li>
        </ul>
      </div>
    );
  }
}
export default withRouter(LeftMenu);
