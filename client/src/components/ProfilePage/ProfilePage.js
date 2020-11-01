import React, { Component } from "react";
import UIBlock from "components/ProfilePage/UIBlock/UIBlock";
import PersonalInfo from "components/utils/Profile/PersonalInfo/PersonalInfo";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import { connect } from "react-redux";
import { updatePageName } from "store/actions/page/page";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";
import InfiniteProfileFeed from "./InfiniteProfileFeed/InfiniteProfileFeed";
import { resetPost } from "store/actions/posts/posts";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ProfilePage extends Component {
  state = {
    fetched: false,
    error: false,
    gender: "",
    blood_group: "",
    locality: "",
    latitude: "",
    longitude: "",
    country: "",
    description: "",
    fullname: "",
    username: "",
    email: "",
    userImage: ""
  };

  fetchPeople = async () => {
    try {
      const id = this.props.match.params.id;
      const res = await axios.get(`/api/getpeople/${id}`);
      const {
        gender,
        blood_group,
        locality,
        latitude,
        longitude,
        country,
        description,
        fullname,
        username,
        email,
        userImage
      } = res.data;
      this.setState({
        gender,
        blood_group,
        locality,
        latitude,
        longitude,
        country,
        description,
        fullname,
        username,
        email,
        userImage,
        fetched: true
      });
      console.log("User is fetched ", res.data);
    } catch (error) {
      this.setState({
        error:
          "Either the user with provided id does not exist or there is some problem in the server"
      });
    }
  };

  componentDidMount = () => {
    this.props.updatePageName("Profile Page");
    this.fetchPeople();
  };

  render() {
    if (this.state.error) {
      return <div className="ProfilePage--middle">{this.state.error}</div>;
    }
    let spinner = (
      <div className="ProfilePage--middle">
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={50}
          color={"#123abc"}
          loading={true}
        />
      </div>
    );
    if (!this.state.fetched) {
      return spinner;
    }
    return (
      <div className="ProfilePage">
        <ApplicationSideNav />
        <ApplicationHeader />
        <LeftMenu />
        <OnlineOfflineFriends />
        <div className="ProfilePage__body">
          <div className="container">
            <div className="row">
              <div className="col">
                <UIBlock
                  friendName={this.state.username}
                  friendId={this.props.match.params.id}
                  friendImage={this.state.userImage}
                />
              </div>
            </div>
            {/* User Personal Info */}
            <div className="row ProfilePage__bottom-header-profile">
              <div className="col-md-5">
                <PersonalInfo
                  gender={this.state.gender}
                  blood_group={this.state.blood_group}
                  locality = {this.state.locality}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  country={this.state.country}
                  description={this.state.description}
                  fullname={this.state.fullname}
                  username={this.state.username}
                  email={this.state.email}
                />
              </div>
              <div className="col-md-6 ProfilePage__users">
                <InfiniteProfileFeed id={this.props.match.params.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { updatePageName }
)(ProfilePage);
