import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class OnlineGroupMember extends Component {
  onUserClick = () => {
    const id = this.props.id;
    this.props.history.push(`/profilepage/${id}`);
  };
  render() {
    const { props } = this;
    return (
      <li className="OnlineGroupMember" onClick={this.onUserClick}>
        <div className="OnlineGroupMember__avatar-wrapper">
          <img
            src={props.image}
            className="OnlineGroupMember__avatar-wrapper__image"
            alt=""
          />
        </div>
        <div className="OnlineGroupMember__content">
          <p className="OnlineGroupMember__content__name">{props.name}</p>
          <p className="OnlineGroupMember__content__user-type">NEW USER</p>
        </div>
      </li>
    );
  }
}
export default withRouter(OnlineGroupMember);
