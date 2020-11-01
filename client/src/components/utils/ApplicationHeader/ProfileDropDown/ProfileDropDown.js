import React, { Component } from "react";
import { connect } from "react-redux";
import DropDown from "components/utils/DropDown/DropDown";
import { logoutUser } from "store/actions/profile/profile";
import { withRouter } from "react-router-dom";
import Icon from "components/utils/Icon/Icon";

class ProfileDropDown extends Component {
  onLogoutClick = () => {
    const history = this.props.history;
    this.props.logoutUser(history);
  };

  onCreateChatGroup = () => {
    this.props.history.push("/create-chat-group");
  };

  onClickProfileSettings = () => {
    this.props.history.push("/settings/profile");
  };
  render() {
    const { props } = this;
    let name = "";
    let image = "";
    if (props.profile && props.profile.fullname && props.profile.userImage) {
      name = props.profile.fullname;
      image = props.profile.userImage;
    }
    return (
      <div className="ProfileDropDown">
        <img src={image} className="ProfileDropDown__image" alt="" />
        <DropDown
          location="right"
          displayText={
            <div className="ProfileDropDown__content-wrapper">
              <p className="ProfileDropDown__name">
                {name}{" "}
                <i className="fas fa-chevron-down ProfileDropDown__chevron-icon" />
              </p>
              <p className="ProfileDropDown__sub-header">NEW USER</p>
            </div>
          }
        >
          <div className="ProfileDropDown__block-title-container">
            <h6 className="ProfileDropDown__block-title">Your Profile</h6>
          </div>
          <ul className="ProfileDropDown__account-settings">
            <li
              className="ProfileDropDown__account-settings__link"
              onClick={this.onClickProfileSettings}
            >
              <Icon name="menu-icon" color="#515365" size={19} />
              <span>Profile Settings</span>
            </li>
            <li
              className="ProfileDropDown__account-settings__link"
              onClick={this.onCreateChatGroup}
            >
              <Icon name="star-icon" color="#515365" size={19} />
              <span>Create Chat Group</span>
            </li>
            <li
              className="ProfileDropDown__account-settings__link"
              onClick={this.onLogoutClick}
            >
              <Icon name="logout-icon" color="#515365" size={19} />
              <span>Log out</span>
            </li>
          </ul>
          <div className="ProfileDropDown__block-title-container">
            <h6 className="ProfileDropDown__block-title">Chat Settings</h6>
          </div>
          <ul className="ChatSettings">
            <li className="ChatSettings__setting">
              {" "}
              <span className="icon-status icon-status--online ChatSettings__icon" />
              <span className="ChatSettings__setting__text">Online</span>
            </li>
            <li className="ChatSettings__setting">
              {" "}
              <span className="icon-status icon-status--away ChatSettings__icon" />
              <span className="ChatSettings__setting__text">Away</span>
            </li>
            <li className="ChatSettings__setting">
              {" "}
              <span className="icon-status icon-status--disconnected ChatSettings__icon" />
              <span className="ChatSettings__setting__text">Disconnected</span>
            </li>
            <li className="ChatSettings__setting">
              {" "}
              <span className="icon-status icon-status--invisible ChatSettings__icon" />
              <span className="ChatSettings__setting__text">Invisible</span>
            </li>
          </ul>
        </DropDown>
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
    { logoutUser }
  )(ProfileDropDown)
);
