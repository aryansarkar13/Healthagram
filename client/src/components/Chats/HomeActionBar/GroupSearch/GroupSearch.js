import React, { Component } from "react";
import { updateGroupFilterText } from "store/actions/group/group";
import { connect } from "react-redux";

class GroupSearch extends Component {
  state = {
    searchValue: ""
  };

  onInputChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  onSearchClick = () => {
    this.props.updateGroupFilterText(this.state.searchValue);
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.onSearchClick();
    }
  };
  render() {
    return (
      <div className="GroupSearch">
        <input
          className="GroupSearch__input"
          type="text"
          value={this.state.searchValue}
          onChange={this.onInputChange}
          onKeyPress={this._handleKeyPress}
          placeholder="Enter Your Group Name"
        />

        <span onClick={this.onSearchClick} className="GroupSearch__search-btn">
          <i class="fas fa-search" />
        </span>
      </div>
    );
  }
}

export default connect(
  null,
  { updateGroupFilterText }
)(GroupSearch);
