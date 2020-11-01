import React, { Component } from "react";
import PostCardCommentItem from "./PostCardCommentItem/PostCardCommentItem";
import PostCardCommentForm from "./PostCardCommentForm/PostCardCommentForm";
import classnames from "classnames";

class PostCardComments extends Component {
  renderPostCardComments = () => {
    return this.props.comments.map(comment => {
      return (
        <PostCardCommentItem
          image={comment.user.userImage}
          name={comment.user.username}
          text={comment.text}
          date={comment.date}
        />
      );
    });
  };

  render() {
    return (
      <div
        className={classnames({
          PostCardComments: true,
          "PostCardComments--visible": this.props.commentOpen
        })}
      >
        <PostCardCommentForm
          postId={this.props.postId}
          postIndex={this.props.postIndex}
        />
        {this.renderPostCardComments()}
      </div>
    );
  }
}

export default PostCardComments;
