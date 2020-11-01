import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "store/actions/posts/posts";

class PostCardCommentForm extends Component {
  state = {
    comment: ""
  };

  changeCommentText = e => {
    this.setState({ comment: e.target.value });
  };

  onAddComment = async () => {
    try {
      const res = await this.props.addComment(
        this.props.postId,
        this.props.postIndex,
        this.state.comment
      );
      this.setState({ comment: "" });
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response);
    }
  };
  render() {
    return (
      <div className="PostCardCommentForm">
        <img
          src={this.props.profile ? this.props.profile.userImage : ""}
          alt=""
          className="PostCardCommentForm__author-thumb"
        />
        <textarea
          placeholder="Enter your comment here"
          className="PostCardCommentForm__comment-area"
          value={this.state.comment}
          onChange={this.changeCommentText}
        />
        <div
          onClick={this.onAddComment}
          className="PostCardCommentForm__post-btn"
        >
          Comment
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addComment }
)(PostCardCommentForm);
