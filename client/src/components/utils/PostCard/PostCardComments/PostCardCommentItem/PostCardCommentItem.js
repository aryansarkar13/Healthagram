import React, { Component } from "react";
import moment from "moment";

class PostCardCommentItem extends Component {
  render() {
    const { props } = this;
    return (
      <div className="PostCardCommentItem">
        <div className="PostCardCommentItem__author-area">
          <img
            src={props.image}
            alt=""
            className="PostCardCommentItem__author-thumb"
          />
          <div className="PostCardCommentItem__date-area">
            <p className="PostCardCommentItem__author-name">Samrat Luintel</p>
            <p className="PostCardCommentItem__post-time">
              {moment(props.date).fromNow()}
            </p>
          </div>
        </div>
        <p className="PostCardCommentItem__actual-post">{props.text}</p>
      </div>
    );
  }
}
export default PostCardCommentItem;
