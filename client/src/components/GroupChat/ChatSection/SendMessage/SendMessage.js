import React, { Component } from "react";
import { sendGroupMessage } from "store/actions/groupchat/groupchat";
import { connect } from "react-redux";
import { saveGroupMessage } from "store/actions/group/group";

class SendMessage extends Component {
  state = {
    message: ""
  };
  onSendMessage = async () => {
    //saves the group message in the database
    await this.props.saveGroupMessage(this.props.groupname, this.state.message);
    //send the group message to other online user
    this.props.sendGroupMessage(
      this.state.message,
      this.props.groupname,
      this.props.profile
    );
    this.setState({ message: "" });
  };
  _handleKeyPress = e => {
    console.log("key press os called");
    if (e.key === "Enter") {
      this.onSendMessage();
    }
  };
  onTextChange = e => {
    this.setState({ message: e.target.value });
  };
  render() {
    return (
      <div className="SendMessage">
        <div className="SendMessage__form">
          <textarea
            name="message"
            className="SendMessage__message"
            rows="1"
            placeholder="Type your message"
            onChange={this.onTextChange}
            onKeyPress={this._handleKeyPress}
            value={this.state.message}
          />
          <button
            onClick={this.onSendMessage}
            className="SendMessage__send-btn"
          >
            <i class="fas fa-paper-plane" />
          </button>
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
  { sendGroupMessage, saveGroupMessage }
)(SendMessage);
