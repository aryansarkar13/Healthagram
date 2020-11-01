import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
class SearchFriend extends Component {
  state = {
    searchText: ""
  };

  onSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onFindPeopleClick = () => {
    if (this.state.searchText !== "") {
      this.props.history.push(`/findpeople/${this.state.searchText}`);
    }
  };

  _handleKeyPress = e => {
    console.log("key press os called");
    if (e.key === "Enter") {
      this.onFindPeopleClick();
    }
  };
  render() {
    return (
      <Fragment>
        <div className="SearchFriend">
          <div className="SearchFriend__search-bar">
            <input
              type="text"
              placeholder="Search here for people or pages"
              value={this.state.searchText}
              onChange={this.onSearchTextChange}
              onKeyPress={this._handleKeyPress}
              className="SearchFriend__search-input"
            />
          </div>
        </div>
        <div onClick={this.onFindPeopleClick} className="FindFriend">
          <p>Find People</p>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(SearchFriend);


