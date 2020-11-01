import React, { Component, Fragment } from "react";
import SideBar from "components/Settings/SideBar/SideBar";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import ProfileSignUp from "components/Settings/MainProfile/ProfileSignup/ProfileSignup";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import { connect } from "react-redux";
import ProgressMessage from "components/utils/ProgressMessage/ProgressMessage";
import { updatePageName } from "store/actions/page/page";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MainProfile extends Component {
  state = {
    saving: false,
    saved: false
  };

  componentDidMount = () => {
    this.props.updatePageName("Edit Profile");
  };

  profileSavingProgress = () => {
    let progress;
    if (this.state.saving || this.state.saved) {
      progress = (
        <ProgressMessage
          message="Your profile is being saved"
          finishedMessage="Your profile is successfully saved"
          finished={this.state.saved}
          onCrossed={this.resetSavingMessage}
        />
      );
    }
    return progress;
  };

  resetSavingMessage = () => {
    this.setState({ saving: false, saved: false });
  };
  profileSaving = () => {
    this.setState({ saving: true, saved: false });
  };

  profileSaved = () => {
    this.setState({ saving: false, saved: true });
  };

  render() {
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
    if (!this.props.profile) {
      return spinner;
    }
    return (
      <Fragment>
        <ApplicationSideNav />
        <ApplicationHeader />
        <LeftMenu />
        <OnlineOfflineFriends />

        <div className="MainProfile">
          <div className="container MainProfile__container">
            {this.profileSavingProgress()}
            <div className="row">
              <div className="col-md-4">
                <SideBar />
              </div>
              <div className="col-md-8">
                <ProfileSignUp
                  saving={this.state.saving}
                  saved={this.state.saved}
                  profileSaved={this.profileSaved}
                  profileSaving={this.profileSaving}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { updatePageName }
)(MainProfile);
