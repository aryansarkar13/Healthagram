import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CreateChatGroup extends Component {
  onCreateChatGroup = () => {
    this.props.history.push("/create-chat-group");
  };
  render() {
    return (
      <div className="CreateChatGroup">
        <div className="CreateChatGroup__content">
          <div
            className="CreateChatGroup__content__plus"
            onClick={this.onCreateChatGroup}
          >
            <i class="fas fa-plus" />
          </div>
          <div className="CreateChatGroup__author-content">
            <h5 className="CreateChatGroup__author-content__title">
              Create a Chat Group
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateChatGroup);
