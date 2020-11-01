import React, { Component } from "react";
import AuthorArea from "components/ProfilePage/UIBlock/ProfileSection/AuthorArea/AuthorArea";
import ProfileMenu from "components/ProfilePage/UIBlock/ProfileSection/ProfileMenu/ProfileMenu";
import ControlBlock from "components/ProfilePage/UIBlock/ProfileSection/ControlBlock/ControlBlock";

class ProfileSection extends Component {
  render() {
    const { props } = this;
    return (
      <div className="ProfileSection">
        <AuthorArea
          friendImage={props.friendImage}
          friendName={props.friendName}
        />
        <ProfileMenu />
        <ControlBlock friendName={props.friendName} friendId={props.friendId} />
      </div>
    );
  }
}
export default ProfileSection;
