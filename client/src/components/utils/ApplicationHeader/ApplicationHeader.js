import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProfileDropDown from "components/utils/ApplicationHeader/ProfileDropDown/ProfileDropDown";
import FriendRequestDropDown from "components/utils/ApplicationHeader/FriendRequestDropDown/FriendRequestDropDown";
import MessagesDropDown from "components/utils/ApplicationHeader/MessagesDropDown/MessagesDropDown";
import logo from "assets/images/lol.jpg";
import SearchFriend from "components/utils/ApplicationHeader/SearchFriend/SearchFriend";
import { updatePageName } from "store/actions/page/page";

class ApplicationHeader extends Component {
  render() {
    const { props } = this;
    return (
      <Fragment>
        <div className="Header">
          <div className="Header__brand">
            {" "}
            <Link to="/home" className="Header__brand-img-container">
              <img className="Header__brand-img" src={logo} alt="" />
            </Link>
          </div>
          <div className="Header__title-container">
            <h6 className="Header__title">{props.page.name}</h6>
          </div>
          <div className="Header__main-action">
            <div className="Header__main-action__upper">
              <SearchFriend />
            </div>
            <div className="Header__main-action__lower">
              <div className="Header__control-block">
                <FriendRequestDropDown />
                <MessagesDropDown />
                <ProfileDropDown />
                {/* It is just a empty place. In this place side Nav hamburger icon is placed from ApplicationSideNav.js */}
                <div className="Header__control-block__empty" />
              </div>
            </div>
          </div>
        </div>
        {/*Since header is set to position fixed, we need another transparent object to occupy that space */}
        <div className="Header__placeholder" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page
});
export default connect(mapStateToProps)(ApplicationHeader);
