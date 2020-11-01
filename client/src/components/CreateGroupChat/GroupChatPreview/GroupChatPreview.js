import React, { Component } from "react";

class GroupChatPreview extends Component {
  render() {
    const { props } = this;
    return (
      <div className="GroupChatPreview">
        <div className="GroupChatPreview__header-container">
          <h1 className="GroupChatPreview__header-container__title">
            Group Chat Preview
          </h1>
        </div>
        <div className="GroupChatPreview__avatar">
          <div className="GroupChatPreview__avatar__image-container">
            <img
              className="GroupChatPreview__avatar__image"
              src={props.groupImageUrl || "s"}
              alt=""
            />
          </div>

          <div className="GroupChatPreview__author-content">
            <h5 className="GroupChatPreview__author-content__name">
              {props.groupname || "Group name"}
            </h5>
            <p className="GroupChatPreview__author-content__country">
              {props.country || "Group country"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupChatPreview;
