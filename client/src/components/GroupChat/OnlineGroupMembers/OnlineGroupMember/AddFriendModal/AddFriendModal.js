import React, { Component } from "react";
import Modal from "components/utils/Modal/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendFriendRequest } from "store/actions/friend/friend";

class AddFriendModal extends Component {
  redirectToProfile = () => {
    this.props.history.push(`/profile/${this.props.name}`);
  };

  onSendRequest = () => {
    const sender = this.props.profile.fullname;
    const receiver = this.props.name;
    const data = {
      sender,
      receiver,
      groupname: this.props.groupname
    };
    this.props.sendFriendRequest(data);
  };

  render() {
    //props.name is the receiver name to whom we are going to send request
    //or whose profile we are viewing

    //props.profile.fullname is the sender name. or the user profile
    const { props } = this;
    return (
      <Modal triggerText={this.props.triggerText}>
        <div className="AddFriendModal">
          <p className="AddFriendModal__receiver-name">{props.name}</p>
          <br />
          <button
            onClick={this.onSendRequest}
            className="AddFriendModal__addfriend-btn"
          >
            <i class="fas fa-user-plus" />
            Add Friend
          </button>
          <button>View Profile</button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  groupname: state.groupchat.groupname
});
export default withRouter(
  connect(
    mapStateToProps,
    { sendFriendRequest }
  )(AddFriendModal)
);
