import React, { Component } from "react";
import OnlineGroupMember from "components/GroupChat/OnlineGroupMembers/OnlineGroupMember/OnlineGroupMember";
import { connect } from "react-redux";

class OnlineGroupMembers extends Component {
  state = {
    searchText: ""
  };

  onSearchTextChange = e => {
    console.log("on seacrch text change", e);
    this.setState({ searchText: e.target.value });
  };

  filterOnlineFriends = () => {
    let searchText = this.state.searchText;
    const filteredMembers = this.props.onlineMembers.filter(member => {
      const textMatch =
        searchText === "" ||
        member.name.toLowerCase().includes(searchText.toLowerCase());
      return textMatch;
    });
    return filteredMembers;
  };
  renderOnlineMembers = () => {
    const onlineMembers = this.filterOnlineFriends(this.props.onlineMembers);
    if (onlineMembers.length === 0) {
      return (
        <p className="OnlineGroupMembers__no-member">
          There are no members to show{" "}
        </p>
      );
    }
    return onlineMembers.map(friend => {
      return (
        <OnlineGroupMember
          name={friend.name}
          image={friend.image}
          id={friend.id}
        />
      );
    });
  };
  render() {
    const { props } = this;
    return (
      <div className="OnlineGroupMembers">
        <div className="OnlineGroupMembers__header-area">
          <h2 className="OnlineGroupMembers__header-area__title">
            Online Group Members ({props.onlineMembers.length})
          </h2>
          <h2 className="OnlineGroupMembers__header-area__search-box">
            <span>
              <i class="fas fa-search" />
            </span>
            <input
              type="text"
              className="OnlineGroupMembers__header-area__search-input"
              placeholder="Search the people in the group"
              value={this.state.searchText}
              onChange={this.onSearchTextChange}
            />
          </h2>
        </div>
        <div className="OnlineGroupMembers__sub-header">Online People</div>
        <ul className="OnlineGroupMembers__members-list">
          {this.renderOnlineMembers()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onlineMembers: state.groupchat.onlineMembers
});
export default connect(mapStateToProps)(OnlineGroupMembers);
