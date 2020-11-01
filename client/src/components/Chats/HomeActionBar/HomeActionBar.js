import React, { Component } from "react";
import Filter from "components/Chats/HomeActionBar/Filter/Filter";
import GroupSearch from "components/Chats/HomeActionBar/GroupSearch/GroupSearch";

class HomeActionBar extends Component {
  render() {
    return (
      <div className="HomeActionBar">
        <div className="HomeActionBar__ui-block">
          <h6 className="HomeActionBar__ui-block__title">Group Chat Filter</h6>
          <div className="HomeActionBar__ui-block__actions">
            <Filter />
            <GroupSearch />
          </div>
        </div>
      </div>
    );
  }
}
export default HomeActionBar;
