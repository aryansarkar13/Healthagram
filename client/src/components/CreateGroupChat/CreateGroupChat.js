import React, { Component } from "react";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import GroupChatForm from "components/CreateGroupChat/GroupChatForm/GroupChatForm";
import GroupChatPreview from "components/CreateGroupChat/GroupChatPreview/GroupChatPreview";
import { withRouter } from "react-router-dom";
import ProgressMessage from "components/utils/ProgressMessage/ProgressMessage";
import axios from "axios";
import { connect } from "react-redux";
import { updatePageName } from "store/actions/page/page";

class CreateGroupChat extends Component {
  state = {
    //This url is used for live preview
    groupImageUrl: "",

    groupImage: "",
    //error set when the user does not submit any image
    groupImageError: "",
    groupname: "",
    //error set when the user does not submit any name
    groupnameError: "",
    country: "",
    //error set when the user does not submit any country
    countryError: "",
    error: "",
    saving: false,
    saved: false
  };

  onGroupNameChange = groupname => {
    //reset the error message
    if (this.state.groupnameError) this.setState({ groupnameError: "" });
    this.setState({
      groupname
    });
  };

  onCountryChange = country => {
    if (this.state.countryError) this.setState({ countryError: "" });
    this.setState({
      country
    });
  };

  onGroupImageChange = groupImage => {
    if (this.state.groupImageError) this.setState({ groupImageError: "" });
    const groupImageUrl = URL.createObjectURL(groupImage);
    this.setState({ groupImage, groupImageUrl });
  };

  saveUserImage = async () => {
    console.log("Save Group image is called");
    const formData = new FormData();
    formData.append("image", this.state.groupImage);
    try {
      const res = await axios.post("/api/chat-group/image-upload", formData);
      //Returns the id of image saved in server
      return res.data;
    } catch (err) {}
  };

  resetSavingMessage = () => {
    this.setState({ saving: false, saved: false });
  };

  groupSavingProgress = () => {
    let progress;
    if (this.state.saving || this.state.saved) {
      progress = (
        <ProgressMessage
          message="Your group is being created"
          finishedMessage="Your group is successfully created"
          finished={this.state.saved}
          onCrossed={this.resetSavingMessage}
        />
      );
    }
    return progress;
  };

  onCreateChatGroup = async e => {
    console.log("On create chat group is called");

    //check if the user has not provided a group name
    if (!this.state.groupname)
      return this.setState({
        groupnameError: "You need to provide the group name"
      });

    //check if the user has not provided a country
    if (!this.state.country)
      return this.setState({
        countryError: "You need to provide a country name"
      });

    if (!this.state.groupImage)
      return this.setState({
        groupImageError: "You need to provide a group image"
      });
    try {
      this.setState({ saving: true });
      //save the user image in the server
      const imageId = await this.saveUserImage();
      const rawImageUrl =
        "https://res.cloudinary.com/samrat/image/upload/c_fill,g_face,h_120,w_120/v1540572400/";
      const fullImageUrl = `${rawImageUrl}${imageId}`;

      await axios.post("/api/create-chat-group", {
        name: this.state.groupname,
        country: this.state.country,
        image: fullImageUrl
      });
      this.setState({ saved: true });
      this.props.history.push("/home");
    } catch (error) {
      console.log(error.response.data.message);
      this.setState({
        groupnameError: error.response.data.message,
        saving: false,
        saved: false
      });
    }
  };

  componentDidMount = () => {
    this.props.updatePageName("Create Group");
  };

  render() {
    return (
      <div className="CreateGroupChat">
        <ApplicationSideNav />
        <ApplicationHeader />
        <LeftMenu />
        <OnlineOfflineFriends />
        <div className="CreateGroupChat__body">
          <div className="container">
            {this.groupSavingProgress()}
            <div className="row">
              <div className="col-md-4">
                <GroupChatPreview
                  groupname={this.state.groupname}
                  country={this.state.country}
                  groupImageUrl={this.state.groupImageUrl}
                />
              </div>
              <div className="col-md-8">
                <GroupChatForm
                  groupNameChange={this.onGroupNameChange}
                  countryChange={this.onCountryChange}
                  groupImageChange={this.onGroupImageChange}
                  createChatGroup={this.onCreateChatGroup}
                  groupname={this.state.groupname}
                  groupnameError={this.state.groupnameError}
                  countryError={this.state.countryError}
                  groupImageError={this.state.groupImageError}
                  country={this.state.country}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { updatePageName }
  )(CreateGroupChat)
);
