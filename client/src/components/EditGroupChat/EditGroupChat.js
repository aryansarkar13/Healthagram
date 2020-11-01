import React, { Component } from "react";
import ApplicationHeader from "components/utils/ApplicationHeader/ApplicationHeader";
import OnlineOfflineFriends from "components/utils/Chat/OnlineOfflineFriends/OnlineOfflineFriends";
import EditGroupChatPreview from "components/EditGroupChat/EditGroupChatPreview/EditGroupChatPreview";
import EditGroupChatForm from "components/EditGroupChat/EditGroupChatForm/EditGroupChatForm";
import ApplicationSideNav from "components/utils/ApplicationSideNav/ApplicationSideNav";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import LeftMenu from "components/utils/LeftMenu/LeftMenu";
import ProgressMessage from "components/utils/ProgressMessage/ProgressMessage";
import { updatePageName } from "store/actions/page/page";
import { connect } from "react-redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EditGroupChat extends Component {
  state = {
    fetched: false,
    fetchError: "",
    groupname: "",
    country: "",
    //error set when the user does not submit any country
    countryError: "",
    groupImageUrl: "",
    //error set when the user does not submit any image
    groupImageError: "",
    image: "",
    imageChanged: false,

    saving: false,
    saved: false,

    deleting: false,
    deleted: false,
    error: ""
  };

  onCountryChange = country => {
    //reset the error message
    if (this.state.countryError) this.setState({ countryError: "" });
    this.setState({
      country
    });
  };

  onGroupImageChange = groupImage => {
    //reset the error message
    if (this.state.groupImageError) this.setState({ groupImageError: "" });
    const groupImageUrl = URL.createObjectURL(groupImage);
    this.setState({ groupImage, groupImageUrl, imageChanged: true });
  };

  onEditChatGroup = async e => {
    console.log("On edit chat group is called");
    //check if the user has not provided a country
    if (!this.state.country)
      return this.setState({
        countryError: "You need to provide a country name"
      });

    if (!this.state.groupImageUrl)
      return this.setState({
        groupImageError: "You need to provide a group image"
      });
    try {
      const id = this.props.match.params.id;
      this.setState({ saving: true });
      let fullImageUrl;

      //sets the image url to the one obtained from server
      fullImageUrl = this.state.groupImageUrl;
      if (this.state.imageChanged) {
        //if the user has changed the image, change the image
        const imageId = await this.saveUserImage();
        const rawImageUrl =
          "https://res.cloudinary.com/samrat/image/upload/c_fill,g_face,h_120,w_120/v1540572400/";
        fullImageUrl = `${rawImageUrl}${imageId}`;
      }
      await axios.post(`/api/edit-chat-group/${id}`, {
        country: this.state.country,
        image: fullImageUrl
      });
      this.setState({ saved: true });
      this.props.history.push("/home");
    } catch (err) {
      console.log(err.response);
      this.setState({ error: err.response.data.message });
    }
  };

  onDeleteChatGroup = async () => {
    try {
      this.setState({ deleting: true });
      const id = this.props.match.params.id;
      await axios.post(`/api/delete-chat-group/${id}`);
      this.setState({ deleting: false, deleted: true });
      this.props.history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  saveUserImage = async () => {
    console.log("Save Group image is called");
    const formData = new FormData();
    formData.append("image", this.state.groupImage);
    try {
      const res = await axios.post("/api/chat-group/image-upload", formData);
      //Returns the id of image saved in server
      return res.data;
    } catch (err) {
      console.log(err);
      this.setState({
        error:
          "Oops some error occured while trying to save. Please try again later"
      });
    }
  };

  fetchGroup = async () => {
    const id = this.props.match.params.id;
    try {
      const res = await axios.get(`/api/get-chat-group/${id}`);
      console.log("From fetch chat group", res.data);
      const { name, country, image } = res.data;
      this.setState({
        groupname: name,
        country,
        groupImageUrl: image,
        fetched: true
      });
    } catch (err) {
      console.log("Error from EditGroupChat", err);
      this.setState({
        fetchError:
          "Either the Chat Group with given id does not exist or that is not the group you created."
      });
    }
  };

  groupSavingProgress = () => {
    let progress;
    if (this.state.saving || this.state.saved) {
      progress = (
        <ProgressMessage
          message="Your changes are being saved"
          finishedMessage="Your changes are successfully saved"
          finished={this.state.saved}
          onCrossed={this.resetSavingMessage}
        />
      );
    }
    return progress;
  };

  resetSavingMessage = () => {
    //Though user can never click on cross button as they are redirected
    //but still .....
    this.setState({ saving: false, saved: false });
  };
  groupDeletingProgress = () => {
    let progress;
    if (this.state.deleting || this.state.deleted) {
      progress = (
        <ProgressMessage
          message="Your group is being deleted"
          finishedMessage="Your group is successfully deleted"
          finished={this.state.deleted}
          onCrossed={this.resetDeletingMessage}
        />
      );
    }
    return progress;
  };

  resetDeletingMessage = () => {
    //Though user can never click on cross button as they are redirected
    //but still .....
    this.setState({ deleting: false, deleted: false });
  };

  componentDidMount = () => {
    this.props.updatePageName("Edit Group");
    this.fetchGroup();
  };

  render() {
    //If some problem has occured while fetching the group, display them
    if (this.state.fetchError) {
      return (
        <div className="EditGroupChat__middle">
          <p className="EditGroupChat__middle__error-text">
            {this.state.fetchError}
          </p>
        </div>
      );
    }
    let spinner = (
      <div className="EditGroupChat__middle">
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
      <div className="EditGroupChat">
        <ApplicationSideNav />
        <ApplicationHeader />
        <LeftMenu />
        <OnlineOfflineFriends />
        <div className="EditGroupChat__body">
          <div className="container">
            {this.groupSavingProgress()}
            {this.groupDeletingProgress()}
            <div className="row">
              <div className="col-md-4">
                <EditGroupChatPreview
                  groupname={this.state.groupname}
                  country={this.state.country}
                  groupImageUrl={this.state.groupImageUrl}
                />
              </div>
              <div className="col-md-8">
                <EditGroupChatForm
                  editChatGroup={this.onEditChatGroup}
                  deleteChatGroup={this.onDeleteChatGroup}
                  countryChange={this.onCountryChange}
                  groupImageChange={this.onGroupImageChange}
                  groupname={this.state.groupname}
                  groupnameError={this.state.groupnameError}
                  countryError={this.state.countryError}
                  groupImageError={this.state.groupImageError}
                  country={this.state.country}
                  error={this.state.error}
                />
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
)(EditGroupChat);
