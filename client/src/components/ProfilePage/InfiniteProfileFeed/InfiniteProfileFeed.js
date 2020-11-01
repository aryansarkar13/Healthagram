import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import PostCard from "components/utils/PostCard/PostCard";
import { connect } from "react-redux";
import { fetchPeoplePost, resetPost } from "store/actions/posts/posts";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";

const override = css``;

class InfiniteNewsFeed extends Component {
  state = {
    //start index of the post
    skip: 0,
    //how many to fetch at a particular request
    limit: 1,
    fetching: false,
    scrollable: true
  };

  loadMorePost = async () => {
    if (!this.state.fetching) {
      this.setState({ fetching: true });
      console.log("Skip thing", this.state.skip);
      await this.props.fetchPeoplePost(
        this.state.skip,
        this.state.limit,
        this.props.id
      );
      this.setState(prevState => {
        return { skip: prevState.skip + prevState.limit, fetching: false };
      });
    }
  };

  renderPost = () => {
    console.log("render post is called");
    if (!this.props.profile || !this.props.profile.keys) return;
    if (this.props.posts.list.length === 0)
      return (
        <p className="InfiniteProfileFeed__error">
          The user does not have any posts
        </p>
      );

    return this.props.posts.list.map((post, index) => {
      return (
        <PostCard
          images={post.images}
          likes={post.likes}
          index={index}
          comments={post.comments}
          text={post.text}
          id={post._id}
          date={post.date}
          user={post.user}
        />
      );
    });
  };

  componentWillUnmount = () => {
    this.props.resetPost();
  };

  render() {
    return (
      <div className="InfiniteProfileFeed">
        {" "}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMorePost}
          hasMore={this.props.posts.scrollable}
          loader={
            <div className="InfiniteProfileFeed__loading" key={0}>
              <ClipLoader
                className={override}
                sizeUnit={"px"}
                size={23}
                color={"#00bcd1"}
                loading={true}
              />
            </div>
          }
        >
          {this.renderPost()}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  posts: state.posts
});
export default connect(
  mapStateToProps,
  { fetchPeoplePost, resetPost }
)(InfiniteNewsFeed);
