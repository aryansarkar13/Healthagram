import React, { Component } from "react";

class EditGroupChatPreview extends Component {
  render() {
    const { props } = this;
    return (
      <div className="EditGroupChatPreview">
        <div className="EditGroupChatPreview__header-container">
          <h1 className="EditGroupChatPreview__header-container__title">
            Group Chat Preview
          </h1>
        </div>
        <div className="EditGroupChatPreview__avatar">
          <div className="EditGroupChatPreview__avatar__image-container">
            <img
              className="EditGroupChatPreview__avatar__image"
              src={props.groupImageUrl || "s"}
              alt=""
            />
          </div>

          <div className="EditGroupChatPreview__author-content">
            <h5 className="EditGroupChatPreview__author-content__name">
              {props.groupname || "Group name"}
            </h5>
            <p className="EditGroupChatPreview__author-content__country">
              {props.country || "Group country"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default EditGroupChatPreview;
