import React, { Component, Fragment } from "react";
import Icon from "components/utils/Icon/Icon";
import classnames from "classnames";
import PostCardComments from "./PostCardComments/PostCardComments";
import moment from "moment";
import { connect } from "react-redux";
import { addLike, removeLike, hidePost } from "store/actions/posts/posts";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class PostCard extends Component {
  state = {
    moreHovered: false,
    commentOpen: false,
    hasLiked: null,
    isImageFull: false
  };

  toggleComment = () =>
    this.setState(prevState => ({ commentOpen: !prevState.commentOpen }));

  onLikeUnlikeClick = async () => {
    if (!this.state.hasLiked) {
      //id,index,likes
      await this.props.addLike(this.props.id, this.props.index);
    } else {
      await this.props.removeLike(this.props.id, this.props.index);
    }
    this.setHasLiked();
  };

  componentDidMount = () => {
    this.setHasLiked();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevProps.profile && this.props.profile && this.props.profile.loggedIn)
      this.setHasLiked();
  };

  setHasLiked = () => {
    if (!this.props.profile) return;
    let hasLiked = false;
    this.props.likes.map(like => {
      if (like.user.toString() === this.props.profile.id) {
        hasLiked = true;
      }
    });
    this.setState({ hasLiked });
  };

  showImageFull = () => {
    this.setState({ isImageFull: true });
  };
  render() {
    const { props } = this;
    const keys = this.props.profile.keys;
    console.log(keys);
    const rawImageURL = `https://res.cloudinary.com/${
      keys.cloudinary.name
    }/image/upload/`;
    const imageURL = `${rawImageURL}c_scale,h_800/${props.images[0]}`;

    const postBackgroundImageStyle = {
      backgroundImage: `url(${imageURL})`
    };
    return (
      <Fragment>
        <div className="PostCard">
          {this.state.isImageFull && (
            <Lightbox
              mainSrc={imageURL}
              onCloseRequest={() => this.setState({ isImageFull: false })}
            />
          )}
          <div className="PostCard__author-thumb">
            <img
              src={props.user.userImage}
              alt=""
              className="PostCard__author-thumb__image"
            />
            <div className="PostCard__author-thumb__date-wrapper">
              <h6 className="PostCard__author-thumb__author-name">
                {props.user.username}
              </h6>
              <div className="PostCard__author-thumb__date">
                {moment(props.date).fromNow()}
              </div>
            </div>
            <div
              className="PostCard__author-thumb__more"
              onMouseEnter={() => this.setState({ moreHovered: true })}
              onMouseLeave={() => this.setState({ moreHovered: false })}
            >
              <Icon name="three-dots-icon" color="#c0c4d8" size={16} />
              <ul
                className={classnames({
                  PostCard__more__dropdown: true,
                  "PostCard__more__dropdown--visible": this.state.moreHovered
                })}
              >
                <li
                  onClick={() => this.props.hidePost(this.props.index)}
                  className="PostCard__more__dropdown__list-item"
                >
                  Hide
                </li>
              </ul>
            </div>
          </div>
          <p className="PostCard__text">{props.text}</p>

          {props.images.length !== 0 && (
            <div
              className="PostCard__image"
              onClick={this.showImageFull}
              style={postBackgroundImageStyle}
            />
          )}

          <div className="PostCard__additional-info">
            <div
              onClick={this.onLikeUnlikeClick}
              className={classnames({
                "PostCard__additional-info__like": true,
                "PostCard__additional-info__like--already-liked": this.state
                  .hasLiked
              })}
            >
              <Icon name="heart-icon" color="#c0c4d8" size={19} />
              <span>{props.likes.length}</span>
            </div>
            <div
              className="PostCard__additional-info__comments-shared"
              onClick={this.toggleComment}
            >
              <Icon name="speech-balloon-icon" color="#c0c4d8" size={19} />
              <span>{props.comments.length}</span>
            </div>
          </div>
          <div className="PostCard__control-block">
            <div
              onClick={this.onLikeUnlikeClick}
              data-tip="Like photo"
              className="PostCard__control-block__single-block"
            >
              <Icon name="heart-icon" color="#fff" size={17} />
            </div>
            <div
              data-tip="Comment"
              className="PostCard__control-block__single-block"
              onClick={this.toggleComment}
            >
              <Icon name="speech-balloon-icon" color="#fff" size={17} />
            </div>
          </div>
        </div>
        {/* Comments */}
        <PostCardComments
          commentOpen={this.state.commentOpen}
          openComment={this.openComment}
          comments={props.comments}
          postId={this.props.id}
          postIndex={this.props.index}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addLike, removeLike, hidePost }
)(PostCard);
