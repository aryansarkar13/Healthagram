import React, { Component } from "react";
import { connect } from "react-redux";
import PersonalInfo from "components/utils/Profile/PersonalInfo/PersonalInfo";
import { withRouter } from "react-router-dom";
class SideBar extends Component {
  returnImageUrl = () => {
    let imageUrl;
    //If the user has uploaded the new image in Edit Profile
    //It will preview that image
    if (this.props.profile && this.props.profile.localUserImage) {
      imageUrl = this.props.profile.localUserImage;
    } else {
      if (this.props.profile && this.props.profile.userImage) {
        let fetchedImage = this.props.profile.userImage;
        imageUrl = fetchedImage;
      }
    }
    return imageUrl;
  };
  redirectToProfile = () => {
    const id = this.props.profile.id;
    this.props.history.push(`/profilepage/${id}`);
  };
  render() {
    const imageUrl = this.returnImageUrl();
    const { props } = this;
    return (
      <div className="SideBar">
        <div className="SideBar__content">
          <div className="SideBar__avatar">
            <div className="SideBar__author-thumb">
              <img src={imageUrl} className="SideBar__author-image" alt="" />
            </div>
            <div className="SideBar__author-content">
              <p className="SideBar__author-name">{props.profile.fullname}</p>
              <p className="SideBar__author-country">
                {" "}
                {props.profile.country || "No country provided"}{" "}
              </p>
            </div>
          </div>
          <div className="SideBar__info-container">
            <div className="SideBar__info">
              <h6 className="SideBar__info__content">
                {props.profile.friends.length}
              </h6>
              <div className="SideBar__info__title">Friends</div>
            </div>
            <div className="SideBar__info">
              <h6 className="SideBar__info__content">0</h6>
              <div className="SideBar__info__title">Photos</div>
            </div>
            <div className="SideBar__info">
              <h6 className="SideBar__info__content">0</h6>
              <div className="SideBar__info__title">Videos</div>
            </div>
          </div>
          <div className="SideBar__control" onClick={this.redirectToProfile}>
            Preview Profile
          </div>
        </div>
        <div className="SideBar__bottom">
          <PersonalInfo
            fullname={props.profile.fullname}
            username={props.profile.username}
            gender={props.profile.gender}
            blood_group={props.profile.blood_group}
            locality = {props.profile.locality}
            latitude = {props.profile.latitude}
            longitude = {props.profile.longitude}
            description={props.profile.description}
            country={props.profile.country}
            email={props.profile.email}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default withRouter(connect(mapStateToProps)(SideBar));
