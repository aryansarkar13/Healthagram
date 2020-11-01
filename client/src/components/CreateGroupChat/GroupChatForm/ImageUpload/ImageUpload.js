import React, { Component, Fragment } from "react";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import UploadButton from "components/CreateGroupChat/GroupChatForm/ImageUpload/UploadButton/UploadButton";
import axios from "axios";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ImageUpload extends Component {
  state = {
    uploading: false
  };

  onChange = e => {
    // const files = Array.from(e.target.files);

    // e.target.textContent = files;
    // this.setState({ uploading: true });
    // const formData = new FormData();
    // files.forEach((file, i) => {
    //   //name it image for the sake of backend
    //   formData.append("image", file);
    // });
    // this.sendFormData(formData);

    this.props.groupImageChange(e.target.files[0]);
  };

  sendFormData = async formData => {
    try {
      const image = await axios.post(
        "/api/create-chat-group/image-upload",
        formData
      );
      //calls the parent function on Dashboard
      this.props.onFileNameChange(image.data);
      this.setState({
        uploading: false
      });
    } catch (error) {
      console.log("This errors is coming from ImageUpload.js");
      console.log(error);
    }
  };
  render() {
    let loading = null;
    if (this.state.uploading) {
      loading = (
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={15}
          color={"#123abc"}
          loading={this.state.uploading}
        />
      );
    }
    //GroupChatForm__error-message class in in GroupChatForm.scss file
    return (
      <Fragment>
        <UploadButton onChange={this.onChange} />
        {this.props.groupImageError && (
          <p className="GroupChatForm__error-message">
            {this.props.groupImageError}
          </p>
        )}

        {loading}
      </Fragment>
    );
  }
}

export default ImageUpload;
