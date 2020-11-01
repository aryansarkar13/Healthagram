import React, { Component } from "react";
import SingleGroupMessage from "components/PrivateChat/ChatSection/ChatMessage/SingleGroupMessage/SingleGroupMessage";
import { connect } from "react-redux";

class ChatMessage extends Component {
  state = {
    scrolled: false
  };

  renderMessages = () => {
    const userProfileName = this.props.profile.fullname;
    if (this.props.messages.length === 0) {
      return (
        <p className="PrivateChat__ChatMessage__no-message">
          Say Hi to start a conversation
        </p>
      );
    }
    return this.props.messages.map((message, i) => (
      <SingleGroupMessage
        image={message.sender.userImage}
        name={message.sender.username}
        ownMessage={message.sender.username === userProfileName}
        message={message.text}
        key={i}
      />
    ));
  };

  scrollToBottom = () => {
    console.log("Scroll To Bottom is called");
    this.messagesEnd.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  };

  componentDidUpdate() {
    //After the message is received from the server scroll to that message
    if (this.props.messages.length > 0 && !this.state.scrolled) {
      this.scrollToBottom();
      this.setState({ scrolled: true });
    }
    const clientHeight = this.messageContainer.clientHeight;
    const scrollHeight = this.messageContainer.scrollHeight;
    const scrollTop = this.messageContainer.scrollTop;
    //120 is the sum of previous message height + current message height
    if (clientHeight + scrollTop + 120 >= scrollHeight) {
      this.scrollToBottom();
    }
  }

  render() {
    return (
      <div
        className="PrivateChat__ChatMessage"
        ref={el => {
          this.messageContainer = el;
        }}
      >
        <ul className="PrivateChat__ChatMessage__messages">
          {this.renderMessages()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  messages: state.privatechat.messages
});
export default connect(mapStateToProps)(ChatMessage);
