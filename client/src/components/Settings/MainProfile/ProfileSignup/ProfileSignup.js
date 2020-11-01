import React, { Component } from "react";
import { css } from "react-emotion";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";

import {
  saveUserImage,
  saveUserProfile,
  updateLocalUserImage
} from "store/actions/profile/editprofile";

import profileValidation from "components/Settings/MainProfile/ProfileSignup/profileValidation";
import { fetchUser } from "store/actions/profile/profile";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ProfileSignUp extends Component {
  state = {
    imageUploaded: false,
    imageUploading: false,
    errors: {},
    saving: false,
    saved: false,
    editable: false,

    //main form data goes below here
    username: "",
    fullname: "",
    country: "",
    blood_group: "",
    locality: "",
    latitude: null,
    longitude: null,
    gender: "",
    description: "",
    //This is never updated even though user selects new image
    //it is changed during submission
    //see the code on saveProfile
    userImage: ""
  };
  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }

  setGender = e => {
    this.setState({ gender: e.target.value });
  };

  setBlood = e => {
    this.setState({ blood_group: e.target.value});
  };

  setLatLog = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      }), 
      err => console.log(err)
    );
    console.log(this.state.latitude)
  }
  setUserImage = e => {
    //starts the image uploading spinner
    this.setState({ imageUploading: true });

    // Uploads the file in state and on completion
    // spinner is turned off

    this.setState({ userImage: e.target.files[0] }, () => {
      this.setState({ imageUploading: false, imageUploaded: true });
    });
    const localUserImage = URL.createObjectURL(e.target.files[0]);
    //Changes the preview image to uploaded image
    this.props.updateLocalUserImage(localUserImage);
  };

  onInputChange = e => {
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  };

  saveProfile = async () => {
    //If image is being uploaded the user can't save the profile
    if (this.state.imageUploading)
      return console.log("You cant submit a form while image is uploading");
    const stateCopy = { ...this.state };

    const data = {
      username: stateCopy.username,
      fullname: stateCopy.fullname,
      country: stateCopy.country,
      latitude: stateCopy.latitude,
      longitude: stateCopy.longitude,
      locality: stateCopy.locality,
      blood_group: stateCopy.blood_group,
      gender: stateCopy.gender,
      description: stateCopy.description,
      userImage: stateCopy.userImage
    };
    //profile Validation
    let { errors, isValid } = profileValidation(data);

    if (isValid) {
      //Starts the progress message on parent item
      this.props.profileSaving();

      //If user does not want to submit the image we respect their right
      //hence isValid passes even though the image is empty
      let imageId = null;
      if (this.state.imageUploaded && this.state.userImage) {
        imageId = await this.props.saveUserImage(this.state.userImage);
      }

      //If new image is fetched. userImage of cloned state is changed.
      //userImage of original state is never changed due to way this code is set up
      const rawImageUrl =
        "https://res.cloudinary.com/samrat/image/upload/c_fill,g_face,h_100,w_106/v1540572400/";
      if (imageId) data.userImage = `${rawImageUrl}${imageId}`;

      await this.props.saveUserProfile(data);
      this.props.profileSaved();
      this.props.fetchUser();
    } else {
      this.setState({ errors });
      return console.log("Errors from Profile Sign up", errors);
    }
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    //After the data is fetched once from the server
    //editable is set to true and this function never runs
    //It just sets the value of state from props one time
    if (
      nextProps.profile &&
      nextProps.profile.loggedIn &&
      !prevState.editable
    ) {
      return {
        username: nextProps.profile.username,
        fullname: nextProps.profile.fullname,
        gender: nextProps.profile.gender,
        latitude: nextProps.profile.latitude,
        longitude: nextProps.profile.longitude,
        blood_group: nextProps.profile.blood_group,
        locality: nextProps.profile.locality,
        description: nextProps.profile.description,
        userImage: nextProps.profile.userImage,
        country: nextProps.profile.country,
        editable: true
      };
    }
  };

  onUploadProfilePhoto = () => {
    this.imageUploadBtn.click();
  };

  resetSavingMessage = () => {
    this.setState({ saving: false, saved: false });
  };

  render() {
    let imageUploading = null;
    if (this.state.imageUploading) {
      imageUploading = (
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={15}
          color={"#123abc"}
          loading={this.state.uploading}
        />
      );
    }
    return (
      <div className="ProfileSignUp">
        <div className="ProfileSignUp__block-title-container">
          <h6 className="ProfileSignUp__block-title">Personal Information</h6>
        </div>
        <div className="ProfileSignUp__content">
          <div className="ProfileSignUp__form-group">
            <label className="ProfileSignUp__form-group__label">Username</label>
            <input
              type="text"
              className="ProfileSignUp__form-group__input ProfileSignUp__username"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </div>

          {this.state.errors.username}
          <div className="ProfileSignUp__form-group">
            <label className="ProfileSignUp__form-group__label">Fullname</label>
            <input
              type="text"
              className="ProfileSignUp__form-group__input ProfileSignUp__fullname"
              name="fullname"
              value={this.state.fullname}
              onChange={this.onInputChange}
            />
          </div>
          
          {this.state.errors.fullname}
          <div className="ProfileSignUp__form-group">
            <label className="ProfileSignUp__form-group__label">
              Locality
            </label>
            <input
              type="text"
              className="ProfileSignUp__form-group__input ProfileSignUp__country"
              name="locality"
              placeholder="Please Provide a locality name"
              value={this.state.locality}
              onChange={this.onInputChange}
            />
          </div>
          {this.state.errors.locality}
         
          <div className="ProfileSignUp__form-group">
            <label className="ProfileSignUp__form-group__label">
              City,State or Country
            </label>
            <input
              type="text"
              className="ProfileSignUp__form-group__input ProfileSignUp__country"
              name="country"
              placeholder="Please Provide a country name"
              value={this.state.country}
              onChange={this.onInputChange}
            />
          </div>
          {this.state.errors.country}
         <div className="ProfileSignUp__form-group">
            <button onClick={this.setLatLog}>Get Lat/Log</button>
          </div>
          <div
            className="ProfileSignUp__form-group__input ProfileSignUp__gender"
            value={this.state.blood_group}
            onChange={this.setBlood}
          >
            <span>Blood Group</span>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="A+"
                name="blood group"
                checked={this.state.blood_group === "A+"}
              />{" "}
              A+
            </div>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="A-"
                name="blood group"
                checked={this.state.blood_group === "A-"}
              />{" "}
              A-
            </div>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="B+"
                name="blood group"
                checked={this.state.blood_group === "B+"}
              />{" "}
              B+
            </div>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="AB+"
                name="blood group"
                checked={this.state.blood_group === "AB+"}
              />{" "}
              AB+
            </div>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="AB-"
                name="blood group"
                checked={this.state.blood_group === "AB-"}
              />{" "}
              AB-
            </div>
          </div>
          {this.state.errors.blood_group}
          <div
            className="ProfileSignUp__form-group__input ProfileSignUp__gender"
            value={this.state.gender}
            onChange={this.setGender}
          >
            <span>Gender</span>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="MALE"
                name="gender"
                checked={this.state.gender === "MALE"}
              />{" "}
              Male
            </div>
            <div className="ProfileSignUp__gender__checkbox">
              <input
                type="radio"
                value="FEMALE"
                name="gender"
                checked={this.state.gender === "FEMALE"}
              />{" "}
              Female
            </div>
          </div>
          {this.state.errors.gender}
          <div className="ProfileSignUp__form-group ProfileSignUp__description">
            <label className="ProfileSignUp__form-group__label">
              Description
            </label>
            <textarea
              id=""
              rows="6"
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
              className="ProfileSignUp__form-group__input ProfileSignUp__form-group__input--no-resize"
            />
          </div>
          {this.state.errors.description}

          <div
            className="ProfileSignUp__ProfilePhoto"
            onChange={this.setUserImage}
          >
            <input
              type="file"
              className="ProfileSignUp__image-upload-hidden-btn"
              ref={btn => (this.imageUploadBtn = btn)}
            />
            <div
              className="ProfileSignUp__image-upload-btn"
              onClick={this.onUploadProfilePhoto}
            >
              UPLOAD PROFILE PHOTO <i class="fas fa-upload" />
            </div>
            {/* This is a loader */}
            {imageUploading}
          </div>
          <div className="ProfileSignUp__save-btn" onClick={this.saveProfile}>
            Save Profile
          </div>
          {this.state.saving && (
            <ClipLoader
              className={override}
              sizeUnit={"px"}
              size={15}
              color={"#123abc"}
              loading={this.state.uploading}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { saveUserImage, saveUserProfile, updateLocalUserImage, fetchUser }
)(ProfileSignUp);
