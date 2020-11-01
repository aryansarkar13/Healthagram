import React, { Component } from "react";
import SingleGroupMessage from "components/GroupChat/ChatSection/ChatMessage/SingleGroupMessage/SingleGroupMessage";
import { connect } from "react-redux";

class ChatMessage extends Component {
  state = {
    scrolled: false
  };
  renderMessages = () => {
    const userProfileName = this.props.profile.fullname;
    if (this.props.messages.length === 0) {
      return (
        <p className="ChatMessage__no-message">
          Say Hi to start a conversation
        </p>
      );
    }
    return this.props.messages.map((message, i) => (
      //message.from is the fullname of the user

      <SingleGroupMessage
        name={message.from}
        message={message.text}
        image={message.image}
        ownMessage={message.from === userProfileName}
        key={i}
      />
    ));
  };
  scrollToBottom = () => {
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
        className="ChatMessage"
        ref={el => {
          this.messageContainer = el;
        }}
      >
        <ul className="ChatMessage__messages">
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
  messages: state.groupchat.messages
});
export default connect(mapStateToProps)(ChatMessage);
